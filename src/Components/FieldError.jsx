import React from 'react'

export default function FieldError({ errors, field }) {
  if (!errors?.[field]) return null;

  return (
    <p className="text-red-500 text-sm mt-1">
      {errors[field][0]}
    </p>
  );
}
