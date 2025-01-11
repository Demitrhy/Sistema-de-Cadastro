export const pascalCase = (name: string | number | undefined | null) => {
  let _fullName: string[] = [];
  let _shortening: string = "";

  if (name !== undefined && name != null) {
    let _name = name.toString();
    _fullName = _name.split(" ");
    _fullName = _fullName.map((i) =>
      _shortening.concat(
        i.toUpperCase().substring(0, 1),
        i.toLowerCase().substring(1, i.length)
      )
    );
    _shortening = _fullName.join(" ");
    return _shortening;
  }
  return _shortening;
};
