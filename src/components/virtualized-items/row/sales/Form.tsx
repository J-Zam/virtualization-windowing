import { TextField } from "@mui/material";
import { ISaleItem } from "../../../../interfaces";

export default function CustomForm({ data }: { data: ISaleItem }) {
  return (
    <div className="tw-p-1 tw-flex tw-flex-col tw-gap-6 tw-bg-white ">
      <div
        key={data.id}
        className="tw-flex tw-flex-col tw-gap-6"
      >
        <TextField
          label="Code"
          value={`${data.code}`}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Product"
          value={data.product}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />

        <div className="tw-flex tw-flex-row tw-gap-6">
          <TextField
            label="Customer"
            value={data.customer}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Total"
            value={`$ ${data.total}`}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />

        </div>
        <TextField
          label="Status"
          value={data.status}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
}
