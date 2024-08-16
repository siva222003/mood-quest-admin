import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Plus, X } from "phosphor-react";
import { useToast } from "../ui/use-toast";
import { Question } from "@/data/schema";
import { useUpdateQuestion } from "@/hooks/question";
import SubmitLoader from "../loader/SubmitLoader";

interface AddSectionProps {
  question: Question;
}

const EditQuestion = forwardRef<HTMLButtonElement, AddSectionProps>(({ question }, ref) => {
  const [questionText, setQuestionText] = useState(question.questionText);

  const [type, setType] = useState(question.type);

  const [option, setOption] = useState("");

  const [options, setOptions] = useState<{ text: string }[]>(question.options);

  const isOptions = type === "multiple-choice" || type === "chips";

  const { mutate, isPending } = useUpdateQuestion();

  const { toast } = useToast();

  const handleAddOption = () => {
    if (!option) {
      return;
    }

    const newOption = { text: option };
    setOptions([...options, newOption]);
    setOption("");
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!questionText || !type) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
      });

      return;
    }

    if ((type === "multiple-choice" || type === "chips") && options.length < 2) {
      toast({
        title: "Error",
        description: "Please add at least 2 options",
      });

      return;
    }

    const newQuestion = {
      questionText,
      type,
      options,
    };

    mutate({ questionId: question._id, question: newQuestion });
  };

  const handleCancel = () => {
    setQuestionText(question.questionText);
    setType(question.type);
    setOptions(question.options);

    setOption("");
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <DialogTrigger asChild className="hidden">
        <Button ref={ref} variant="outline">
          Edit Question
        </Button>
      </DialogTrigger>
      <DialogContent onSubmit={handleSubmit} className="max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Edit the question and options for this section here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Question
            </Label>
            <Input
              id="name"
              value={questionText}
              autoComplete="off"
              onChange={(e) => setQuestionText(e.target.value)}
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label className="text-right" htmlFor="framework">
              Type
            </Label>
            <Select
              disabled={questionText.length === 0}
              value={type}
              onValueChange={(e) => setType(e)}
            >
              <SelectTrigger className="col-span-5" id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent defaultChecked={false} position="popper">
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="open-ended">Open Ended</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="chips">Chips</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isOptions ? (
            <div className="grid grid-cols-6 items-center gap-4 mt-4">
              <Label htmlFor="name" className="text-right">
                {type === "multiple-choice" ? "Options" : "Chips"}
              </Label>
              <Input
                id="name"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="col-span-4"
              />

              <div
                onClick={handleAddOption}
                className="rounded-full hover:bg-gray-100 cursor-pointer w-fit p-2"
              >
                <Plus size={22} />
              </div>
            </div>
          ) : null}
        </div>

        {isOptions && (
          <div className="grid grid-cols-2 gap-4">
            {options.map((i, ind) => (
              <Badge key={ind} className="py-3 text-xs justify-evenly" variant={"outline"}>
                {i.text}
                <X onClick={() => handleRemoveOption(ind)} className="cursor-pointer" size={14} />
              </Badge>
            ))}
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="secondary" type="button" onClick={handleSubmit}>
            {isPending ? <SubmitLoader /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditQuestion;
