import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { uploadImageToCloudinary } from "../../utils/cloudinaryAPI";
import { createRoom } from "../../utils/roomsAPI";

const AVAILABILITY_OPTIONS = ["Available", "Unavailable"];
const CATEGORY_OPTIONS = ["Deluxe", "Suite", "Standard", "Villa"];

const INITIAL_FORM = {
  room_title: "",
  room_description: "",
  room_price: "",
  room_availability: "Available",
  room_category: "Deluxe",
  room_capacity: "",
  room_tag: "",
  room_url: "",
};

function AddRoomPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploadError("");
    setUploading(true);

    try {
      const url = await uploadImageToCloudinary(file);
      setForm((prev) => ({ ...prev, room_url: url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Image upload failed");
      setPreviewUrl("");
      setForm((prev) => ({ ...prev, room_url: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.room_url) {
      setSubmitError("Please upload a room image.");
      return;
    }

    setSubmitting(true);
    try {
      await createRoom({
        room_title: form.room_title,
        room_description: form.room_description,
        room_price: Number(form.room_price),
        room_url: form.room_url,
        room_availability: form.room_availability,
        room_category: form.room_category,
        room_capacity: form.room_capacity,
        room_tag: form.room_tag,
      });
      navigate("/home");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page-nav">
        <Link to="/home" className="room-page-back">
          ← Back to collections
        </Link>
      </div>

      <div className="admin-form-container">
        <h1 className="admin-form-title">Add New Room</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="admin-form-group">
            <label className="admin-form-label">Room Image</label>

            <div
              className="admin-image-upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Room preview" className="admin-image-preview" />
              ) : (
                <div className="admin-image-placeholder">
                  <span>Click to upload image</span>
                </div>
              )}
              {uploading && <div className="admin-image-overlay">Uploading...</div>}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {uploadError && <p className="form-error">{uploadError}</p>}
          </div>

          {/* Title */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_title">
              Room Title
            </label>
            <input
              id="room_title"
              name="room_title"
              type="text"
              className="admin-form-input"
              value={form.room_title}
              onChange={handleChange}
              placeholder="e.g. Ocean View Suite"
              required
            />
          </div>

          {/* Description */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_description">
              Description
            </label>
            <textarea
              id="room_description"
              name="room_description"
              className="admin-form-input admin-form-textarea"
              value={form.room_description}
              onChange={handleChange}
              placeholder="Room description..."
              required
            />
          </div>

          {/* Price */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_price">
              Price per Night ($)
            </label>
            <input
              id="room_price"
              name="room_price"
              type="number"
              min="0"
              className="admin-form-input"
              value={form.room_price}
              onChange={handleChange}
              placeholder="e.g. 250"
              required
            />
          </div>

          {/* Category */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_category">
              Category
            </label>
            <select
              id="room_category"
              name="room_category"
              className="admin-form-input"
              value={form.room_category}
              onChange={handleChange}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_availability">
              Availability
            </label>
            <select
              id="room_availability"
              name="room_availability"
              className="admin-form-input"
              value={form.room_availability}
              onChange={handleChange}
            >
              {AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_capacity">
              Capacity
            </label>
            <input
              id="room_capacity"
              name="room_capacity"
              type="text"
              className="admin-form-input"
              value={form.room_capacity}
              onChange={handleChange}
              placeholder="e.g. 2 Guests"
            />
          </div>

          {/* Tag */}
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="room_tag">
              Tag / Badge
            </label>
            <input
              id="room_tag"
              name="room_tag"
              type="text"
              className="admin-form-input"
              value={form.room_tag}
              onChange={handleChange}
              placeholder="e.g. Signature Suite"
            />
          </div>

          {submitError && <p className="form-error">{submitError}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting || uploading}
          >
            {submitting ? "Creating Room..." : "Create Room"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddRoomPage;
