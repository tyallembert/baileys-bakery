import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface FaqItem {
  _id: Id<"faqItems">;
  question: string;
  answer: string;
  order: number;
}

export default function FaqManager() {
  const faqItems = (useQuery(api.faqItems.list) ?? []) as FaqItem[];
  const createFaq = useMutation(api.faqItems.create);
  const updateFaq = useMutation(api.faqItems.update);
  const removeFaq = useMutation(api.faqItems.remove);

  const [editingId, setEditingId] = useState<Id<"faqItems"> | "new" | null>(
    null
  );
  const [form, setForm] = useState({ question: "", answer: "" });

  const startCreate = () => {
    setEditingId("new");
    setForm({ question: "", answer: "" });
  };

  const startEdit = (faq: FaqItem) => {
    setEditingId(faq._id);
    setForm({ question: faq.question, answer: faq.answer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ question: "", answer: "" });
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;

    if (editingId === "new") {
      await createFaq({
        question: form.question,
        answer: form.answer,
        order: faqItems.length,
      });
    } else if (editingId) {
      const faq = faqItems.find((f) => f._id === editingId);
      if (faq) {
        await updateFaq({
          id: editingId,
          question: form.question,
          answer: form.answer,
          order: faq.order,
        });
      }
    }
    cancelEdit();
  };

  const handleDelete = async (id: Id<"faqItems">) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await removeFaq({ id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-100">
            FAQ Items
          </h3>
        </div>
        <Button
          onClick={startCreate}
          disabled={editingId !== null}
          className="bg-primary-700 hover:bg-primary-600 rounded-xl h-10 px-4 transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary-700/25 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqItems.map((faq, index) => (
          <Card
            key={faq._id}
            className="rounded-xl border-border/50 overflow-hidden transition-all duration-200 ease-out hover:shadow-md"
          >
            <CardContent className="p-0">
              {editingId === faq._id ? (
                <div className="p-5 space-y-4 bg-muted/30">
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Question
                    </Label>
                    <Input
                      value={form.question}
                      onChange={(e) =>
                        setForm({ ...form, question: e.target.value })
                      }
                      className="rounded-xl h-11 bg-background border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">Answer</Label>
                    <Textarea
                      value={form.answer}
                      onChange={(e) =>
                        setForm({ ...form, answer: e.target.value })
                      }
                      rows={3}
                      className="rounded-xl bg-background border-border/50 resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl bg-primary-700 hover:bg-primary-600"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={cancelEdit}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4 p-5">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <GripVertical className="w-5 h-5 text-muted-foreground/50 cursor-grab" />
                    <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-300 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-primary-800 dark:text-primary-100">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(faq)}
                      className="rounded-xl h-9"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(faq._id)}
                      className="rounded-xl h-9 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {editingId === "new" && (
          <Card className="rounded-xl border-dashed border-2 border-primary-300 dark:border-primary-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CardContent className="p-5 space-y-4 bg-primary-50/50 dark:bg-primary-900/20">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Question</Label>
                <Input
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                  placeholder="What is your question?"
                  className="rounded-xl h-11 bg-background border-border/50"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Answer</Label>
                <Textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Provide the answer..."
                  rows={3}
                  className="rounded-xl bg-background border-border/50 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="rounded-xl bg-primary-700 hover:bg-primary-600"
                >
                  Add FAQ
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {faqItems.length === 0 && editingId !== "new" && (
          <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground mb-2">No FAQ items yet</p>
            <p className="text-sm text-muted-foreground">
              Click "Add FAQ" to create your first question and answer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
