export const TailwindBreakpoints = () => {
  return (
    <div className="mt-2 ml-2 fixed top-0 left-0">
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block 3xl:hidden">2XL</div>
    </div>
  )
}
