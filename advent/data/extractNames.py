from bs4 import BeautifulSoup
import urllib.request

url = urllib.request.urlopen("https://en.wikipedia.org/wiki/List_of_Christmas_hit_singles_in_the_United_Kingdom")
page = url.read()
soup = BeautifulSoup(page, 'html.parser')
tds = soup.find_all('td')
for td in soup.find_all('td'):
    if(td.text[0:1] == '"' and 'christmas' in td.text.lower()):
        print(td.text.strip())
