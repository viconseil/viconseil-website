@echo off
echo ====================================
echo    MISE A JOUR DU SITE VICONSEIL
echo ====================================
echo.

rem Changer vers le bon dossier
cd /d "C:\Users\vizqu\OneDrive - VIconseil\CLAUDE Code\SITE WEB VI conseil"

echo Verification des modifications...
git status
echo.

echo Ajout de tous les fichiers modifies...
git add .
echo.

rem Demander le message de commit
set /p commit_message="Entrez un message pour cette mise a jour (ou appuyez sur Entree pour utiliser un message par defaut): "

rem Utiliser un message par défaut si rien n'est saisi
if "%commit_message%"=="" (
    set commit_message=Mise a jour du site
)

echo Creation du commit avec le message: "%commit_message%"
git commit -m "%commit_message%"
echo.

echo Envoi vers GitHub...
git push origin main
echo.

if %errorlevel% == 0 (
    echo ✅ SUCCES ! Vos modifications ont ete envoyees vers GitHub
    echo ⏳ Vercel va se mettre a jour automatiquement dans 1-2 minutes
    echo 🌐 Consultez votre dashboard Vercel pour voir le deploiement
) else (
    echo ❌ ERREUR lors de l'envoi vers GitHub
    echo Verifiez votre connexion internet et vos identifiants Git
)

echo.
echo Appuyez sur une touche pour fermer...
pause >nul