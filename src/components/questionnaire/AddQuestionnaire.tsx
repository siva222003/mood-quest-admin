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
import { useCreateQuestionnaire } from "@/hooks/questionnaire";
import { useEffect, useState } from "react";
import SubmitLoader from "../loader/SubmitLoader";

export default function DialogDemo() {
  const [title, setTitle] = useState("");

  const { mutate, isPending } = useCreateQuestionnaire();

  const handleSubmit = () => {
    mutate({ title });
  };

  useEffect(() => {
    if (!isPending && title) {
      setTitle("");
    }
  }, [isPending]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 mr-4 h-full border-none">Add Questionnaire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Questionnaire</DialogTitle>
          <DialogDescription>Add a new questionnaire to the list.</DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="title" className="text-center">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="default" type="button" onClick={handleSubmit}>
            {isPending ? <SubmitLoader /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
