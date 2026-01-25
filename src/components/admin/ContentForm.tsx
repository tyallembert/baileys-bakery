import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContentForm() {
  const content = useQuery(api.siteContent.get);
  const upsert = useMutation(api.siteContent.upsert);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroCtaText: "",
    heroCtaLink: "",
    heroImageUrl: "",
    aboutPreview: "",
    aboutStory: "",
  });

  useEffect(() => {
    if (content) {
      setForm({
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        heroCtaText: content.heroCtaText,
        heroCtaLink: content.heroCtaLink,
        heroImageUrl: content.heroImageUrl,
        aboutPreview: content.aboutPreview,
        aboutStory: content.aboutStory,
      });
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await upsert(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-600 dark:text-primary-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-100">
            Hero Section
          </h3>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="heroTitle"
              className="text-foreground font-medium"
            >
              Title
            </Label>
            <Input
              id="heroTitle"
              value={form.heroTitle}
              onChange={(e) => updateField("heroTitle", e.target.value)}
              placeholder="Welcome to Baileys Bakery"
              className="rounded-xl h-11 bg-muted/30 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="heroSubtitle"
              className="text-foreground font-medium"
            >
              Subtitle
            </Label>
            <Input
              id="heroSubtitle"
              value={form.heroSubtitle}
              onChange={(e) => updateField("heroSubtitle", e.target.value)}
              placeholder="Homemade treats baked with love"
              className="rounded-xl h-11 bg-muted/30 border-border/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="heroCtaText"
                className="text-foreground font-medium"
              >
                Button Text
              </Label>
              <Input
                id="heroCtaText"
                value={form.heroCtaText}
                onChange={(e) => updateField("heroCtaText", e.target.value)}
                placeholder="View Our Menu"
                className="rounded-xl h-11 bg-muted/30 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="heroCtaLink"
                className="text-foreground font-medium"
              >
                Button Link
              </Label>
              <Input
                id="heroCtaLink"
                value={form.heroCtaLink}
                onChange={(e) => updateField("heroCtaLink", e.target.value)}
                placeholder="/menu"
                className="rounded-xl h-11 bg-muted/30 border-border/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="heroImageUrl"
              className="text-foreground font-medium"
            >
              Hero Image URL{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="heroImageUrl"
              value={form.heroImageUrl}
              onChange={(e) => updateField("heroImageUrl", e.target.value)}
              placeholder="https://..."
              className="rounded-xl h-11 bg-muted/30 border-border/50"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* About Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-400/20 dark:bg-accent-500/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-accent-600 dark:text-accent-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-100">
            About Section
          </h3>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="aboutPreview"
              className="text-foreground font-medium"
            >
              About Preview{" "}
              <span className="text-muted-foreground font-normal">
                (shown on Home page)
              </span>
            </Label>
            <Textarea
              id="aboutPreview"
              value={form.aboutPreview}
              onChange={(e) => updateField("aboutPreview", e.target.value)}
              placeholder="A short description for the home page..."
              rows={3}
              className="rounded-xl bg-muted/30 border-border/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="aboutStory"
              className="text-foreground font-medium"
            >
              Full Story{" "}
              <span className="text-muted-foreground font-normal">
                (shown on About page)
              </span>
            </Label>
            <Textarea
              id="aboutStory"
              value={form.aboutStory}
              onChange={(e) => updateField("aboutStory", e.target.value)}
              placeholder="The full story of your bakery..."
              rows={8}
              className="rounded-xl bg-muted/30 border-border/50"
            />
            <p className="text-sm text-muted-foreground">
              Separate paragraphs with blank lines for better formatting.
            </p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4">
        <Button
          type="submit"
          disabled={saving}
          className="bg-primary-700 hover:bg-primary-600 rounded-xl h-11 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-700/25"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
        {saved && (
          <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 animate-in fade-in duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Changes saved!
          </span>
        )}
      </div>
    </form>
  );
}
