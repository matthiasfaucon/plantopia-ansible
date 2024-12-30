# Plantopia

Plantopia est la référence en ligne pour découvrir, apprendre et partager votre passion pour les plantes.

## Configuration du back-end :
   - Dans le dossier `back-end`, renommer le fichier `.env.example` en `.env`.
   - Ajouter le token et votre adresse mail pour utiliser Resend.
   - Pour obtenir le token et l'adresse mail associés, veuillez consulter la documentation de Resend [ici](https://resend.com/docs/introduction).

## Installation et Utilisation

```bash
git clone https://github.com/matthiasfaucon/plantopia.git
cd app
npm run install:all
cd front-end
npm run dev
cd ../back-end
npm run dev
```

Pour tester la mise en production avec Ansible: `/docs/doc_playbook.md`

## Structure du Projet

- front-end/: Contient le code du front-end développé en Vue.js.
- back-end/: Contient le code du back-end développé en Node.js.
- infrastructure/: Contient le nécessaire pour lancer le playbook Ansible
- docker/: Contient les docker nécessaires pour tester le déploiement avec Ansible