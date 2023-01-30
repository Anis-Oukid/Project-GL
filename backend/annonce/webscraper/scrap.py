from user import User
from announcement import Announcement
from bs4 import BeautifulSoup
import requests
import uuid

""" Web scraper: https://dz.professeurparticulier.com/ 

    domain_name: Sciences, Littérature, Soutien scolaire, Economie, Langues, Droit, Sciences humaines, Informatique, 
                Formation pro., Musique, Sports, Arts

    scrape_by_domain: returns dictionary{Announcement, Teacher} by domain_name
    get_announcement: returns item{Announcement, Teacher} by announcement_url"""


def scrape_by_domain(domain_name):
    url = "https://dz.professeurparticulier.com/"
    result = requests.get(url).text
    doc = BeautifulSoup(result, "html.parser")

    # Get targeted domain
    domains = doc.find_all(class_="index_cat")
    domain = next(filter(lambda cat: cat.p.string == domain_name, domains), None)

    # Get domain's themes
    themes_links = domain.find_all("a")
    themes = []
    for theme_link in themes_links:
        themes.append(requests.get(f'https://dz.professeurparticulier.com/{theme_link["href"]}').text)

    # Get themes' announcements urls
    announcements_urls = []
    for theme in themes:
        theme_doc = BeautifulSoup(theme, "html.parser")
        links = list(theme_doc.find("td", rowspan="2").findChildren("div", recursive=False))[2:-2]
        for link in links:
            link = link["onclick"].split("href='/", 1)[1].replace("'", '')
            announcements_urls.append(requests.get(f'https://dz.professeurparticulier.com/{link}').text)

    # Get announcements
    announcements = {}
    for announcement_url in announcements_urls:
        announcement, teacher = get_announcement(announcement_url)
        announcements[announcement] = teacher

    return announcements


def get_announcement(announcement_url):
    announcement_doc = BeautifulSoup(announcement_url, "html.parser")
    col2 = announcement_doc.find("div", id="col2")

    # Get announcement
    a_id = uuid.uuid4()
    title = announcement_doc.find("h1", class_="anntot").string
    cat = col2.find_all("div")[1].text
    cat = str(cat).split("Niveau maximum enseigné : ", 1)[-1].strip()
    theme = announcement_doc.find("div", id="col3").h2.strong.text
    modality = col2.find("div", style="margin-top:2").text
    # addition_description = col2.text.strip()
    # description = announcement_doc.find("div", id="colb1").h3.text + f'\n{addition_description}'
    description = announcement_doc.find("div", id="colb1").h3.text
    price = col2.find("p", style="font-size:1.5rem; font-weight:bold; margin-bottom:10; margin-top:5").find("strong", recursive=False).text
    location = col2.find("p", class_="grisouille").text.replace(" Domiciliation :", "").strip()
    images = []
    image = announcement_doc.find("div", class_="img_anntot")
    if (image is not None):
        image = image["style"].split("background-image:url(", 1)[1].replace(");background-size:cover; background-repeat: no-repeat; background-position: top;", '')
    images.append(image)

    # Get teacher
    t_id = uuid.uuid4()
    first_name = announcement_doc.find("div", id="col1").find_all("div", recursive=False)[1].text

    # {Announcement, Teacher}
    announcement = Announcement(a_id, title, cat, theme, modality, description, price, t_id, location, images)
    teacher = User(t_id, first_name, "", "", location, 0, None)
    return announcement, teacher


announcements = scrape_by_domain("Economie")
for a in announcements.keys():
     print(a)

"""
for t in announcements.values():
     print(t)
"""
#print(announcements)
