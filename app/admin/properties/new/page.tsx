"use client";

import { FormEvent, useEffect, useState } from "react";

type Destination = {
  id: number;
  name: string;
  slug: string;
  type: "domestic" | "international";
};

type ImageField = {
  url: string;
  alt: string;
  primary: boolean;
};

export default function NewPropertyPage() {
  const [destinations, setDestinations] = useState<Destination[]>(
    []
  );

  const [loadingDestinations, setLoadingDestinations] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [destinationId, setDestinationId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Resort");
  const [rating, setRating] = useState("5");
  const [priceFrom, setPriceFrom] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [images, setImages] = useState<ImageField[]>([
    {
      url: "",
      alt: "",
      primary: true,
    },
  ]);

  const [amenities, setAmenities] = useState<string[]>([""]);

  /* ============================================================
     LOAD DESTINATIONS
     ============================================================ */

  useEffect(() => {
    async function loadDestinations() {
      try {
        const response = await fetch(
          "/api/admin/properties",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to load destinations."
          );
        }

        setDestinations(data.destinations ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load destinations."
        );
      } finally {
        setLoadingDestinations(false);
      }
    }

    loadDestinations();
  }, []);

  /* ============================================================
     AUTO GENERATE SLUG
     ============================================================ */

  useEffect(() => {
    if (!name) {
      setSlug("");
      return;
    }

    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlug(generatedSlug);
  }, [name]);

  /* ============================================================
     IMAGES
     ============================================================ */

  function addImage() {
    if (images.length >= 5) {
      return;
    }

    setImages([
      ...images,
      {
        url: "",
        alt: "",
        primary: false,
      },
    ]);
  }

  function removeImage(index: number) {
    if (images.length === 1) {
      return;
    }

    const updatedImages = images.filter(
      (_, imageIndex) => imageIndex !== index
    );

    if (
      !updatedImages.some(
        (image) => image.primary
      )
    ) {
      updatedImages[0].primary = true;
    }

    setImages(updatedImages);
  }

  function updateImage(
    index: number,
    field: "url" | "alt",
    value: string
  ) {
    setImages((currentImages) =>
      currentImages.map(
        (image, imageIndex) =>
          imageIndex === index
            ? {
                ...image,
                [field]: value,
              }
            : image
      )
    );
  }

  function setPrimaryImage(index: number) {
    setImages((currentImages) =>
      currentImages.map(
        (image, imageIndex) => ({
          ...image,
          primary: imageIndex === index,
        })
      )
    );
  }

  /* ============================================================
     AMENITIES
     ============================================================ */

  function addAmenity() {
    setAmenities([
      ...amenities,
      "",
    ]);
  }

  function removeAmenity(index: number) {
    if (amenities.length === 1) {
      return;
    }

    setAmenities(
      amenities.filter(
        (_, amenityIndex) =>
          amenityIndex !== index
      )
    );
  }

  function updateAmenity(
    index: number,
    value: string
  ) {
    setAmenities((currentAmenities) =>
      currentAmenities.map(
        (amenity, amenityIndex) =>
          amenityIndex === index
            ? value
            : amenity
      )
    );
  }

  /* ============================================================
     SUBMIT
     ============================================================ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (!destinationId) {
        throw new Error(
          "Please select a destination."
        );
      }

      if (!name.trim()) {
        throw new Error(
          "Please enter the property name."
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Property slug is required."
        );
      }

      const cleanedImages = images
        .filter(
          (image) => image.url.trim()
        )
        .map((image) => ({
          image_url: image.url.trim(),
          alt_text:
            image.alt.trim() ||
            `${name.trim()} property image`,
          is_primary: image.primary,
        }));

      const cleanedAmenities = amenities
        .map((amenity) =>
          amenity.trim()
        )
        .filter(Boolean);

      if (cleanedImages.length === 0) {
        throw new Error(
          "Please add at least one property image."
        );
      }

      const hasPrimaryImage =
        cleanedImages.some(
          (image) => image.is_primary
        );

      if (!hasPrimaryImage) {
        cleanedImages[0].is_primary = true;
      }

      const response = await fetch(
        "/api/admin/properties",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            destination_id:
              Number(destinationId),

            name: name.trim(),

            slug: slug.trim(),

            location:
              location.trim() || null,

            property_type:
              propertyType.trim() || null,

            rating: Number(rating),

            price_from: priceFrom
              ? Number(priceFrom)
              : null,

            description:
              description.trim() || null,

            display_order:
              Number(displayOrder) || 0,

            active,

            images:
              cleanedImages,

            amenities:
              cleanedAmenities,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to create property."
        );
      }

      setMessage(
        `Property "${name.trim()}" created successfully.`
      );

      setDestinationId("");
      setName("");
      setSlug("");
      setLocation("");
      setPropertyType("Resort");
      setRating("5");
      setPriceFrom("");
      setDescription("");
      setDisplayOrder("0");
      setActive(true);

      setImages([
        {
          url: "",
          alt: "",
          primary: true,
        },
      ]);

      setAmenities([""]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create property."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ============================================================
     UI
     ============================================================ */

  return (
    <main className="min-h-screen bg-[#f5f2eb] px-5 py-10 text-[#07172a] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b58935]">
            Welcome Holidays International
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
            Add New Property
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Add a property, its gallery and
            amenities from one place. The
            information will automatically
            appear on the relevant destination
            page.
          </p>
        </div>

        {/* STATUS */}

        {message && (
          <div className="mb-6 rounded-[14px] border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-[14px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ====================================================
              PROPERTY INFORMATION
              ==================================================== */}

          <section className="rounded-[22px] border border-[#e4dfd5] bg-white p-6 shadow-[0_8px_30px_rgba(7,23,42,0.05)] sm:p-8">

            <div className="mb-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                01
              </p>

              <h2 className="mt-2 text-2xl font-medium">
                Property Information
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* DESTINATION */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Destination *
                </label>

                <select
                  value={destinationId}
                  onChange={(event) =>
                    setDestinationId(
                      event.target.value
                    )
                  }
                  disabled={
                    loadingDestinations
                  }
                  required
                  className="w-full rounded-[12px] border border-[#ddd8ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                >
                  <option value="">
                    {loadingDestinations
                      ? "Loading destinations..."
                      : "Select destination"}
                  </option>

                  {destinations.map(
                    (destination) => (
                      <option
                        key={
                          destination.id
                        }
                        value={
                          destination.id
                        }
                      >
                        {destination.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* PROPERTY NAME */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Property Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Cliff-top Club Resort"
                  required
                  className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Property Slug *
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                    )
                  }
                  placeholder="cliff-top-club-resort"
                  required
                  className="w-full rounded-[12px] border border-[#ddd8ce] bg-[#faf9f6] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />

                <p className="mt-2 text-[11px] text-slate-400">
                  Automatically generated
                  from the property name.
                </p>
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
                  placeholder="Ooty, Tamil Nadu"
                  className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />
              </div>

              {/* PROPERTY TYPE */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Property Type
                </label>

                <input
                  type="text"
                  value={propertyType}
                  onChange={(event) =>
                    setPropertyType(
                      event.target.value
                    )
                  }
                  placeholder="Resort"
                  className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />
              </div>

              {/* RATING */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Rating
                </label>

                <select
                  value={rating}
                  onChange={(event) =>
                    setRating(
                      event.target.value
                    )
                  }
                  className="w-full rounded-[12px] border border-[#ddd8ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                >
                  <option value="5">
                    ★★★★★ — 5.0
                  </option>

                  <option value="4.5">
                    ★★★★½ — 4.5
                  </option>

                  <option value="4">
                    ★★★★ — 4.0
                  </option>

                  <option value="3.5">
                    ★★★½ — 3.5
                  </option>

                  <option value="3">
                    ★★★ — 3.0
                  </option>
                </select>
              </div>

              {/* PRICE */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Starting Price / Night
                </label>

                <input
                  type="number"
                  min="0"
                  value={priceFrom}
                  onChange={(event) =>
                    setPriceFrom(
                      event.target.value
                    )
                  }
                  placeholder="7500"
                  className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />
              </div>

              {/* DISPLAY ORDER */}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Display Order
                </label>

                <input
                  type="number"
                  min="0"
                  value={displayOrder}
                  onChange={(event) =>
                    setDisplayOrder(
                      event.target.value
                    )
                  }
                  placeholder="1"
                  className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-6">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows={5}
                placeholder="Describe the property, its atmosphere, location and experience..."
                className="w-full resize-none rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#b58935]"
              />
            </div>

            {/* ACTIVE */}

            <label className="mt-6 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={active}
                onChange={(event) =>
                  setActive(
                    event.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Publish this property
                immediately
              </span>
            </label>
          </section>

          {/* ====================================================
              GALLERY
              ==================================================== */}

          <section className="mt-6 rounded-[22px] border border-[#e4dfd5] bg-white p-6 shadow-[0_8px_30px_rgba(7,23,42,0.05)] sm:p-8">

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                  02
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Property Gallery
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Add up to 5 images and choose
                  one primary image.
                </p>
              </div>

              <button
                type="button"
                onClick={addImage}
                disabled={
                  images.length >= 5
                }
                className="rounded-full bg-[#07172a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#102a44] disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Add Image
              </button>
            </div>

            <div className="space-y-4">

              {images.map(
                (image, index) => (
                  <div
                    key={index}
                    className="rounded-[16px] border border-[#e5e0d7] bg-[#faf9f6] p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">

                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b58935]">
                          Image{" "}
                          {index + 1}
                        </span>

                        {image.primary && (
                          <span className="ml-3 rounded-full bg-[#07172a] px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                            Primary
                          </span>
                        )}
                      </div>

                      {images.length >
                        1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="text-xs font-medium text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-500">
                          Image URL *
                        </label>

                        <input
                          type="url"
                          value={
                            image.url
                          }
                          onChange={(
                            event
                          ) =>
                            updateImage(
                              index,
                              "url",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="https://..."
                          className="w-full rounded-[10px] border border-[#ddd8ce] bg-white px-4 py-3 text-sm outline-none focus:border-[#b58935]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-500">
                          Alt Text
                        </label>

                        <input
                          type="text"
                          value={
                            image.alt
                          }
                          onChange={(
                            event
                          ) =>
                            updateImage(
                              index,
                              "alt",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder={`${name || "Property"} image`}
                          className="w-full rounded-[10px] border border-[#ddd8ce] bg-white px-4 py-3 text-sm outline-none focus:border-[#b58935]"
                        />
                      </div>
                    </div>

                    <label className="mt-4 flex cursor-pointer items-center gap-3">
                      <input
                        type="radio"
                        name="primary-image"
                        checked={
                          image.primary
                        }
                        onChange={() =>
                          setPrimaryImage(
                            index
                          )
                        }
                      />

                      <span className="text-xs text-slate-600">
                        Use this as the
                        primary image
                      </span>
                    </label>
                  </div>
                )
              )}
            </div>
          </section>

          {/* ====================================================
              AMENITIES
              ==================================================== */}

          <section className="mt-6 rounded-[22px] border border-[#e4dfd5] bg-white p-6 shadow-[0_8px_30px_rgba(7,23,42,0.05)] sm:p-8">

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                  03
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Amenities
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Add the facilities and
                  services available at this
                  property.
                </p>
              </div>

              <button
                type="button"
                onClick={addAmenity}
                className="rounded-full bg-[#07172a] px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#102a44]"
              >
                + Add Amenity
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {amenities.map(
                (amenity, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <input
                      type="text"
                      value={amenity}
                      onChange={(
                        event
                      ) =>
                        updateAmenity(
                          index,
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Swimming Pool"
                      className="flex-1 rounded-[10px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none focus:border-[#b58935]"
                    />

                    {amenities.length >
                      1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeAmenity(
                            index
                          )
                        }
                        className="px-2 text-xs text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          </section>

          {/* ====================================================
              SAVE
              ==================================================== */}

          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[22px] bg-[#07172a] p-6 sm:flex-row sm:px-8">

            <div>
              <p className="text-sm font-medium text-white">
                Ready to publish?
              </p>

              <p className="mt-1 text-xs text-white/40">
                The property will appear on
                its destination page after
                saving.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[#d6a84f] px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#07172a] transition hover:bg-[#e5bd63] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {saving
                ? "Saving Property..."
                : "Save Property →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}