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
import SubmitLoader from "../loader/SubmitLoader";

interface EditQuestionnaireProps {
  questionnaire: Questionnaire;
}

const EditQuestionnairefor = forwardRef<HTMLButtonElement, EditQuestionnaireProps>((props, ref) => {
  const [title, setTitle] = useState(props.questionnaire.title);

  const { mutate, isPending } = useUpdateQuestionnaire();

  const handleSubmit = () => {
    mutate({ id: props.questionnaire._id, title });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden">
        <Button ref={ref} variant="outline">
          Edit Questionnaire
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Questionnaire</DialogTitle>
          <DialogDescription>
            Make changes to your questionnaire here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="title" className="text-center">
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
            {isPending ? <SubmitLoader /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditQuestionnairefor;
