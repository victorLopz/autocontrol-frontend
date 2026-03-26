export type AlertType = {
  title: string;
  description?: string;
  buttonText: string;
  className: string;
  isInput: boolean;
  labelInput?: string;
  placeholderInput?: string;
  onConfirm?: () => void;
};
