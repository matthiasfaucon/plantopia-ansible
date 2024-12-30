# Instructions de Déploiement

## Cloner le dépôt
```bash
git clone https://github.com/matthiasfaucon/plantopia-ansible.git
```

## Installation des dépendances
```bash
cd /app
npm run install:all
```

## Construction du front-end
```bash
cd /front-end
npm run build
cd ../
```

## Vérification des clés SSH
Vérifiez que vous avez des clés dans `infrastructure/ssh_keys`. Si ce n'est pas le cas, exécutez:
```bash
docker compose up -d --build
```

## Configuration des fichiers d'environnement
Mettez à jour les informations dans `infrastructure/ansible/roles/app/templates/.env.j2` avec celles envoyées par mail. Faites de même pour `config.yml` dans `infrastructure/ansible/vars/config.yml`.

## Exécution du playbook Ansible
```bash
docker compose exec node_manager bash
ansible-playbook -i inventory.ini infra-playbook.yml
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