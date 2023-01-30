class User:
    def __init__(self, id, first_name, second_name, email, address, phoneNbr, messagerie):
        self.id = id
        self.first_name = first_name
        self.second_name = second_name
        self.email = email
        self.address = address
        self.phoneNbr = phoneNbr
        self.messagerie = messagerie

    def __str__(self) -> str:
        return f'User[id: {self.id}, first_name: {self.first_name}, second_name: {self.second_name}, email: {self.email}, address: {self.address}, phoneNbr: {self.phoneNbr}, messagerie: {self.messagerie}]'
