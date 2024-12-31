# Informations globales

Pour information, j'ai effectué mes tests dans un dossier et tout fonctionnait hormis MySQL qui ne se lançait pas (cf. message Discord). Cependant, lorsque j'ai re-cloné le projet pour tester cette documentation, il m'a été impossible de relancer le playbook. J'ai rencontré un problème avec la connexion SSH et je ne pense pas être le seul. À vrai dire, j'ai eu pas mal de soucis avec Docker. J'ai essayé de citer les plus importants dans la documentation ci-dessous et je sais que beaucoup de personnes n'ont même pas pu tester leur rendu parce qu'elles n'arrivaient pas à faire tourner Docker.

De plus, je suis quasiment sûr que l'ouverture des ports dans mon projet n'est pas correcte (je suppose qu'il faut le faire dans le conteneur target à l'aide du conteneur node_manager, mais la surcouche Docker m'a un peu perdu).

Enfin, il m'est impossible de démarrer MySQL sur le conteneur target à partir du playbook.

# Instructions de Déploiement

## Cloner le dépôt
```bash
git clone https://github.com/matthiasfaucon/plantopia-ansible.git
```

## Installation des dépendances
```bash
cd .\app\
npm run install:all
```

## Build du front-end
```bash
cd .\front-end
npm run build
cd ..\..
```

## Vérification des clés SSH
Vérifiez que vous avez des clés dans `infrastructure/ssh_keys`. Si ce n'est pas le cas, exécutez:
```bash
ssh-keygen -t ed25519 -f infrastructure/ssh_keys/id_ed25519
```

## Configuration des fichiers d'environnement
Allez dans `infrastructure/ansible/roles/app/templates/` et renommer `.env.j2.example` en `.env.j2` et remplacer les valeurs avec celles mises dans le rendu.
Faites de même pour `config.yml.example` en le renommant en `config.yml` dans `infrastructure/ansible/vars/`.

## Lancer les dockers
```bash
docker compose up -d --build
```

## Exécution du playbook Ansible
```bash
docker compose exec node_manager bash
ansible-playbook -i inventory.ini infra-playbook.yml
```

### En cas d'erreur avec entrypoint.sh
Il faut faire la commande suivante:
```bash
dos2unix docker/entrypoint.sh
```
Et donc installer dos2unix au besoin: 
```bash
sudo apt install dos2unix
```

### En cas d'erreur de connexion SSH
Si vous rencontrez une erreur avec le message "Failed to connect to the host via ssh…", allez dans `infrastructure/ssh_keys` et supprimez:
  - `known_hosts`
  - `known_hosts.old`

Puis relancez le playbook:
```bash
ansible-playbook -i inventory.ini infra-playbook.yml
```

### En cas d'erreur lors de l'initialisation de MySQL
Si vous rencontrez une erreur dans la tâche `[mysql : Starting mysql]`, ouvrez un nouveau terminal et exécutez:
```bash
docker compose exec target bash
service mysql start
```

Ensuite, relancez le playbook Ansible:
```bash
ansible-playbook -i inventory.ini infra-playbook.yml
```

Aller voir DOC_AFTER_DEPLOY.md pour la suite.