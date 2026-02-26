import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

type PreviewImageModalProps = {
  open: boolean;
  imageUrl: string | null;
  onOpenChange: (open: boolean) => void;
};

export default function PreviewImageModal({
  open,
  imageUrl,
  onOpenChange,
}: PreviewImageModalProps) {
  if (!imageUrl) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {""}
        <DialogTitle></DialogTitle>
        <div className="flex max-h-[85vh] items-center justify-center">
          <img
            src={imageUrl}
            alt="확대 이미지"
            className="max-h-[85vh] max-w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
