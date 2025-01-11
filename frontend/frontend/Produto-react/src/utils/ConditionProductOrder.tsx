export const conditionProductOrder = (status: string) => {
  let _tagColor: string = ''

//todo: verificar com michel os status de cada item

  switch(true) {
    case status === "pendente":
      _tagColor = "red";
      break;
    case status === "pendente1":
      _tagColor = "green";
      break;
    case status === "pendente2":
      _tagColor = "blue";
      break;
    case status === "encerrado":
      _tagColor = "purple";
      break;
    default:
      _tagColor = "grey";
      break;  
  }
      return _tagColor;
}
