interface Props {
  children: any;
  className?: string;
  disable?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ onClick, className, disable, children }) => {
  return (
    <button className={`bg-yellow-400 rounded-none px-4 py-2 flex ${className}`} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
};

export default Button;

