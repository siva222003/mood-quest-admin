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
import { X } from "phosphor-react";
import { useToast } from "../ui/use-toast";
import { Question } from "@/data/schema";
import { useUpdateQuestion } from "@/hooks/question";

interface AddSectionProps {
  question: Question;
}

const EditQuestion = forwardRef<HTMLButtonElement, AddSectionProps>(({ question }, ref) => {
  const [questionText, setQuestionText] = useState(question.questionText);
  const [type, setType] = useState(question.type);

  const [option, setOption] = useState("");

  const [options, setOptions] = useState<{ text: string }[]>(question.options);

  const isOptions = type === "multiple-choice" || type === "chips";

  const { mutate } = useUpdateQuestion();

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

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden">
        <Button ref={ref} variant="outline">
          Edit Question
        </Button>
      </DialogTrigger>
      <DialogContent onSubmit={handleSubmit} className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
            <Label className="text-left" htmlFor="framework">
              Type
            </Label>
            <Select value={type} onValueChange={(e) => setType(e)}>
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

              <Button onClick={handleAddOption}>Add</Button>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((i, ind) => (
            <Badge key={ind} className="px-4 py-3 gap-2 text-sm justify-evenly" variant={"outline"}>
              {i.text}
              <X onClick={() => handleRemoveOption(ind)} className="cursor-pointer" size={14} />
            </Badge>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="secondary" type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditQuestion;
