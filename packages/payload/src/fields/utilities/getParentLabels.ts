export function getParentLabels(
  parentPathSegments: (number | string)[],
  collectionFields: any[],
): (number | string)[] {
  let currentFields = collectionFields
  const labels: (number | string)[] = []

  for (const segment of parentPathSegments) {
    // If it is a number, it's an index and should be returned
    if (!isNaN(Number(segment))) {
      labels.push(segment)
      continue
    }

    // Find the field that matches the current path segment
    const field = currentFields?.find((f) => {
      if (f.name === segment || f.slug === segment) {return f}
    })

    if (!field) {
      break
    }

    labels.push(field.label ?? segment)

    currentFields = field.fields ?? field.blocks ?? []
  }

  return labels
}
