import { Card } from "react-bootstrap";
import { PassField } from "../../interfaces/pass-fields";

interface FieldBlockProps {
  field: PassField;
  uppercaseLabel?: boolean;
  reduceLabelSize?: boolean;
  labelColor?: string;
  valueColor?: string;
  allowNestedHTML?: boolean;
  alignRight?: boolean;
  primary?: boolean;
}

function FieldBlock({
  field,
  uppercaseLabel = false,
  reduceLabelSize = false,
  labelColor,
  valueColor,
  allowNestedHTML = false,
  alignRight = false,
  primary = false,
}: FieldBlockProps) {
  const labelStyle: React.CSSProperties | undefined = {};
  if (reduceLabelSize) {
    labelStyle["fontSize"] = "0.7rem";
  }
  if (labelColor) {
    labelStyle["color"] = labelColor;
  }
  if (field.label === "" || field.label === undefined) {
    return null;
  } else {
    return (
      <div className="d-flex flex-column justify-content-center">
        <Card.Subtitle
          className={`fw-bold ${uppercaseLabel ? "text-uppercase" : ""} ${
            alignRight ? "text-end" : ""
          }`}
          style={labelStyle}
        >
          {field.label}
        </Card.Subtitle>
        {allowNestedHTML ? (
          <p
            className={`card-text ${alignRight ? "text-end" : ""} ${
              primary ? "fs-2" : ""
            }`}
            style={valueColor ? { color: valueColor } : undefined}
            dangerouslySetInnerHTML={{
              __html: field.value ? field.value.toString().replaceAll("\n", "<br>") : "–",
            }}
          />
        ) : (
          <Card.Text
            className={`${alignRight ? "text-end" : ""} ${
              primary ? "fs-2" : ""
            }`}
            style={valueColor ? { color: valueColor } : undefined}
          >
            {field.value ? field.value.toString() : "–"}
          </Card.Text>
        )}
      </div>
    );
  }
}

export default FieldBlock;
