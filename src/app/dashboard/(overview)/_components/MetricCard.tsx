type Props = {
  label: string;
  value: string | number;
  help?: string;
};

const MetricCard = ({ label, value, help }: Props) => {
  return (
    <div className="rounded-xl border border-accent-blue/20 bg-white p-6 shadow-sm">
      <p className="text-xs text-primary-blue/60">{label}</p>
      <h3 className="mt-3 text-3xl font-extrabold text-primary-blue">
        {value}
      </h3>
      {help ? (
        <div className="mt-1 text-[0.7rem] text-primary-blue/60">{help}</div>
      ) : null}
    </div>
  );
};

export default MetricCard;
