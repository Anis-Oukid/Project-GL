class Announcement:
    def __init__(self, id, title, cat, theme, modality, description, price, announcer, location, images):
        self.id = id
        self.title = title
        self.cat = cat
        self.theme = theme
        self.modality = modality
        self.description = description
        self.price = price
        self.announcer = announcer
        self.location = location
        self.images = images

    def __str__(self) -> str:
        return f'Announcement[id: {self.id}, title: {self.title}, cat: {self.cat}, theme: {self.theme}, modality: {self.modality}, description: {self.description}, price: {self.price}, announcer: {self.announcer}, location: {self.location}, images: {self.images}]'
