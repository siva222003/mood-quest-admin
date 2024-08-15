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
import { Questionnaire } from "@/data/schema";
import { useUpdateQuestionnaire } from "@/hooks/questionnaire";
import { forwardRef, useState } from "react";

interface EditQuestionnaireProps {
  questionnaire: Questionnaire;
}

const EditQuestionnairefor = forwardRef<HTMLButtonElement, EditQuestionnaireProps>((props, ref) => {

  const [title, setTitle] = useState(props.questionnaire.title);

  const { mutate } = useUpdateQuestionnaire();

  const handleSubmit = () => {
    mutate({ id: props.questionnaire._id,title });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden">
        <Button ref={ref} variant="outline">
          Edit Questionnaire
        </Button>
      </DialogTrigger>
      <DialogContent onSubmit={handleSubmit} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Questionnaire</DialogTitle>
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
              defaultValue={props.questionnaire.title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditQuestionnairefor;
