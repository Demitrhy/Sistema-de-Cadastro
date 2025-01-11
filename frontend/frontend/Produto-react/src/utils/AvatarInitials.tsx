export const avatarInitials = (name: string) => {

  let _fullName: string[] = []
  let _shortening: string = ''
  
      _fullName = name.split(" ");
      _fullName = _fullName.map(i => _shortening.concat(i.toUpperCase().substring(0,1)));
      _shortening = _fullName.join();
      _fullName.length > 1 ? _fullName = _fullName.join().split(",",2) : _shortening = _fullName.join();
      _shortening = _fullName.join("");
  
      return _shortening;
}