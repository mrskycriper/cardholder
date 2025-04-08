import { Card } from "react-bootstrap";
import { PassField } from "../../interfaces/pass-fields";

interface FieldBlockProps {
  field: PassField;
  uppercaseLabel?: boolean;
  reduceLabelSize?: boolean
  labelColor?: string;
  valueColor?: string;
  allowNestedHTML?: boolean;
}

function FieldBlock({
  field,
  uppercaseLabel = false,
  reduceLabelSize = false,
  labelColor,
  valueColor,
  allowNestedHTML = false,
}: FieldBlockProps): JSX.Element {
  const labelStyle: React.CSSProperties | undefined = {}
  if (reduceLabelSize) {
    labelStyle["fontSize"] = "0.7rem"
  }
  if (labelColor) {
    labelStyle["color"] = labelColor
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Card.Subtitle
        className={`fw-bold${uppercaseLabel ? " text-uppercase" : ""}`}
        style={labelStyle}
      >
        {field.label}
      </Card.Subtitle>
      {allowNestedHTML ? (
        <p
          className="card-text"
          style={valueColor ? { color: valueColor } : undefined}
          dangerouslySetInnerHTML={{ __html: field.value.toString() }}
        />
      ) : (
        <Card.Text style={valueColor ? { color: valueColor } : undefined}>
          {field.value}
        </Card.Text>
      )}
    </div>
  );
}

export default FieldBlock;
