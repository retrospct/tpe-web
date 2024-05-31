export const Debug = ({ data }: { data: any }) => {
  if (!data) return null
  return (
    <code className="text-left text-secondary">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </code>
  )
}
