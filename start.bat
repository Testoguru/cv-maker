@echo off
echo Kaynnistetaan CV Maker -sovellus paikallisesti...
echo Selain avautuu automaattisesti osoitteeseen http://localhost:3000
echo Odota hetki, etta palvelin kaynnistyy.

:: Avaa selain
start http://localhost:3000

:: Kaynnista Next.js dev server
npm run dev

pause
