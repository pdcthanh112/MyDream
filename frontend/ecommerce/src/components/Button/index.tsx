interface Props {
  children: any;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ onClick, className, children }) => {
  return (
    <button className={`bg-yellow-400 rounded-lg px-4 py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

