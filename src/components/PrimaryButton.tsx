interface PrimaryButtonProps {
  text: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button className="px-4 py-2 bg-primary text-white text-base rounded-md font-normal hover:bg-primaryButtonHover">
      {props.text}
    </button>
  );
}
