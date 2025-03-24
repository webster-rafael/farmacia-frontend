import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget uploadPreset="ApiZap" onSuccess={onUpload}>
      {({ open }) => {
        return (
          <Button
            type="button"
            onClick={() => open()}
            className="w-full bg-primary text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Carregar imagem
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
