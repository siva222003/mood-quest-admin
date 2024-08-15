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
import { useState } from "react";

export default function DialogDemo() {
  const [title, setTitle] = useState("");

  const { mutate } = useCreateQuestionnaire();

  const handleSubmit = () => {
    mutate({ title });
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Questionnaire</Button>
      </DialogTrigger>
      <DialogContent onSubmit={handleSubmit} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Questionnaire</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
