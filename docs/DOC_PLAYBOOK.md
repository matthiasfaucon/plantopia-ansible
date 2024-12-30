Pour informations j'ai fait mes tests dans un dossier, quand j'ai reclone le projet pour tester cette documentation impossible de relancer le playbook... J'ai un problème avec la connexion SSH et je ne pense pas être le seul, je sais que certaines personnes n'ont même pas pu tester leur rendu.

De plus, je suis quasiment sûr que l'ouverture des ports dans projets n'est pas bonne (je suppose qu'il faut le faire dans le conteneur target à l'aide du contenur node_manager mais je ne savais pas comment faire)

Et pour finir impossible de start mysql sur le conteneur target à partir du pipeline.

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

## Construction du front-end
```bash
cd ./front-end
npm run build
cd ../..
```

## Vérification des clés SSH
Vérifiez que vous avez des clés dans `infrastructure/ssh_keys`. Si ce n'est pas le cas, exécutez:
```bash
ssh-keygen -t ed25519 -f infrastructure/ssh_keys/id_ed25519
```

## Configuration des fichiers d'environnement
Allez dans `infrastructure/ansible/roles/app/templates/` et renommer `.env.j2.example` en `.env.j2` et remplacer les valeurs avec celles envoyées par mail.
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

## En cas d'erreur avec entrypoint.sh
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