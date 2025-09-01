@echo off
echo ====================================
echo    MISE A JOUR DU SITE VI CONSEIL
echo ====================================
echo.

REM Vérifier les changements
echo 1. Vérification des changements...
git status

echo.
echo 2. Ajout des fichiers modifiés...
git add .

echo.
echo 3. Création du commit...
set /p commit_message="Entrez votre message de commit (ou appuyez sur Entrée pour un message par défaut): "

if "%commit_message%"=="" (
    set commit_message=Mise à jour du site VI Conseil
)

git commit -m "%commit_message%"

echo.
echo 4. Push vers GitHub...
git push origin main

echo.
echo ====================================
echo    MISE A JOUR TERMINÉE !
echo ====================================
echo Le site a été mis à jour sur GitHub.
echo Vercel va automatiquement déployer les changements.
echo.
pause