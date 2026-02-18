alias vifix='vi ./be/routes/singles/createPassword.js'
alias pm2restart='pm2 restart vsingles;pm2log'
alias pm2log='pm2 flush;clear;pm2 log'
alias cdv='cd  ~/code/vsingles;ls -latr'
alias dbconnect='psql -h 127.0.0.1 -U postgres -p 50010'
alias dbconnectfull='psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles'

changeit() {
    getusers
    # 1. Prompt for inputs
    read -p "Enter singles_id: " sid
    read -p "Enter email: " uemail
    read -p "Enter password: " upass

    # 2. Match the flags from your working 'dbconnectfull' alias
    # -h 127.0.0.1 (Force network connection)
    # -p 50010     (Use the specific port)
    # -d vsingles  (Connect to the correct database)
    psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "
    INSERT INTO singles (singles_id, email, password_hash)
    VALUES ($sid, '$uemail', '$upass')
    ON CONFLICT (singles_id) 
    DO UPDATE SET 
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash;
    "
    
    # 3. Refresh the view
    getusers
}

#profile_image_url

changeimage() {
    getimages
    # 1. Prompt for inputs 
    read -p "Enter singles_id: " sid
    read -p "Enter image url: " imageurl

    # 2. Match the flags from your working 'dbconnectfull' alias
    # -h 127.0.0.1 (Force network connection)
    # -p 50010     (Use the specific port)
    # -d vsingles  (Connect to the correct database)
    psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "
    INSERT INTO singles (singles_id, profile_image_url)
    VALUES ($sid, '$imageurl')
    ON CONFLICT (singles_id)
    DO UPDATE SET 
       profile_image_url = EXCLUDED.profile_image_url;
    "
    
    # 3. Refresh the view
    getimages
} 

alias fakeenv='sudo cp ~/.ssh/be/.env.4git ./be/.env;cat ./be/.env'
alias realenv='sudo cp ~/.ssh/be/.env ./be/.env;cat ./be/.env'
alias showenv='sudo cat ~/.ssh/be/.env'

alias hatestreload='haproxy -c -f /etc/haproxy/haproxy.cfg; sudo systemctl reload haproxy;sudo systemctl status haproxy'
######### test pg #######################################################
updatepassword() {
  read -p "Enter new password: " newpassword
  psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles \
    -c "UPDATE users SET password = '${newpassword}' WHERE last_name='CEO';"
}
getusers(){
  #psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "SELECT * FROM users;"
  psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "select * FROM user_summary;"
}
getimages(){
  psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "select singles_id, profile_image_url FROM singles;"
}
######## veirfy PG ########################################################
alias verifyreplica='sudo -u postgres psql -c "SELECT pid, status, receive_start_lsn, receive_start_tli, written_lsn FROM pg_stat_wal_receiver;"'
alias verifyprimary='sudo -u postgres psql -c "SELECT pid, usesysid, usename, application_name, client_addr FROM pg_stat_replication;"'
alias verifydatadir='sudo -u postgres psql -c "show data_directory;"'

######## PG ###########
alias pg='sudo -u postgres psql'
alias pglisten='sudo ss -tulnp | grep 50010'
alias pgstatus='showpgmain;systemctl status "postgresql@*";pglisten;'
alias pgstart='sudo systemctl start postgresql;pgstatus'
alias pgstop='sudo systemctl stop postgresql;pgstatus'
alias pgrestart='sudo systemctl restart postgresql;pgstatus'
alias pgclusters='pg_lsclusters'
alias pglog='sudo tail -f /var/log/postgresql/postgresql-16-main.log'
alias pgconf='sudo vi /etc/postgresql/16/main/postgresql.conf'
alias pghba='sudo vi /etc/postgresql/16/main/pg_hba.conf'
alias pgreload='sudo pg_ctlcluster 16 main reload'

###### ha ################## 
alias wherepghbaconf='sudo -u postgres psql -p 50010 -c "SHOW hba_file;"'
alias hareload='sudo systemctl reload ssh'

alias vifile0='sudo -u postgres vi /var/lib/postgresql/.pgpass;sudo -u postgres chmod 600 /var/lib/postgresql/.pgpass'

alias vireload='sudo systemctl reload ssh; sudo systemctl restart postgresql;sudo pg_ctlcluster 16 main reload;pgstatus'

alias oldlsdata='sudo ls -latr /var/lib/postgresql/16/main'
alias lsdata='sudo ls -latr /mnt/nvme/pgdata16/'

alias oldvifile1='sudo vi /etc/postgresql/16/main/postgresql.conf;vireload'
alias vifile1='sudo vi    /etc/postgresql/16/main/postgresql.conf;vireload'

alias oldvifile2='sudo vi /var/lib/postgresql/16/main/pg_hba.conf;vireload'
alias vifile2='sudo vi /etc/postgresql/16/main/pg_hba.conf'
#alias vifile2='sudo vi    /mnt/nvme/pgdata16/pg_hba.conf;vireload'

alias oldvifile3='sudo vi /var/lib/postgresql/16/main/postgresql.auto.conf;vireload'
alias vifile3='sudo vi    /mnt/nvme/pgdata16/postgresql.auto.conf;vireload'

alias oldvifile4='sudo vi /var/lib/postgresql/16/main/standby.signal;vireload'
alias vifile4='sudo vi    /mnt/nvme/pgdata16/standby.signal;vireload'
  
alias oldvifile5='sudo vi /var/lib/postgresql/16/main/pg_ident.conf'
alias vifile5='sudo vi    /mnt/nvme/pgdata16/pg_ident.conf'

alias oldvifile6='sudo vi /etc/systemd/system/postgresql@16-main.service'
alias vifile6='sudo vi /etc/systemd/system/postgresql@16-main.service'


alias securefile3='sudo chmod 600 /var/lib/postgresql/16/main/postgresql.auto.conf;sudo chown postgres:postgres /var/lib/postgresql/16/main/postgresql.auto.conf'
alias securedatadir='sudo chmod 700 /var/lib/postgresql/16/main;sudo chown postgres:postgres /var/lib/postgresql/16/main'
###### postres ############

sethostname() {
    echo -n "New host name ? "
    read NEW_HOSTNAME

    if [ -z "$NEW_HOSTNAME" ]; then
        echo "ERROR: hostname cannot be empty"
        return 1
    fi

    echo "Setting hostname to: $NEW_HOSTNAME"

    sudo hostname "$NEW_HOSTNAME"
    sudo hostnamectl set-hostname "$NEW_HOSTNAME"

    echo
    echo "Edit /etc/hosts now (make sure 127.0.1.1 maps to $NEW_HOSTNAME)"
    sudo vi /etc/hosts

    echo
    echo "Current hostname status:"
    hostnamectl

    echo
    echo "Rebooting system..."
    sudo reboot
}

###############

vinetplan() {
    echo "=== show ARP/neighbor cache ==="
    sudo ip neigh show || return 1

    sudo vi /etc/netplan/50-cloud-init.yaml || return 1

    echo "=== netplan generate ==="
    sudo netplan generate || return 1

    echo "=== netplan apply ==="
    sudo netplan apply || return 1

    echo "=== ip addr ===" || return 1
    ip addr || return 1

    echo "=== ip route ===" || return 1
    ip route || return 1

    echo "=== flushing ARP/neighbor cache and show ==="
    sudo ip neigh flush all || return 1
    sudo ip neigh show || return 1
}

###############
alias nowaitboot='sudo systemctl disable netplan-wait-online.service; sudo systemctl mask netplan-wait-online.service'
###############
alias watchlink='watch -n 1 ip -br link show'
alias pgrebootenable='sudo systemctl enable postgresql'
alias ufwrebootenable='systemctl is-enabled ufw'

alias getuuid='clear;sudo blkid /dev/nvme0n1;echo '========';lsblk;echo '=======/etc/fstab file====';cat /etc/fstab;echo '=======';verifymount'
alias verifymount='df -h | grep pgdata16;mount | grep pgdata16'
##################################
memcheck() {
  clear
  sudo dmidecode -t memory |
  awk '
    /^Memory Device$/ { in_device=1; locator=""; size="" }
    in_device && /^[[:space:]]*Locator:/ && $0 !~ /Bank Locator/ { locator=$0 }
    in_device && /^[[:space:]]*Size:/ { size=$0 }
    in_device && /^$/ {
      if (size !~ /No Module Installed/ && locator != "") {
        print locator
        print size
        print ""
      }
      in_device=0
    }
  '
  sudo edac-util -v
}


#####################################
showmem () {
  clear
  echo '=== Below memory type by sticks==='
  sudo dmidecode -t memory | grep -i "Type Detail";
  echo '=== Below memory size by sticks==='
  sudo dmidecode -t memory | awk '
  /Memory Device/ {slot=""; size=""}
  /Locator:/ {slot=$2}
  /Size:/ {size=$2" "$3}
  /Type Detail:/ {print slot, size, $0}
  '
}
#####################################

alias vifstab='sudo vi /etc/fstab; sudo mount -a;sudo systemctl daemon-reload'

alias showscript='echo "----.profile----"; cat ~/.profile; \
echo "----.bash_profile----"; cat ~/.bash_profile; \
echo "----.bashrc----"; cat ~/.bashrc'
###################
alias hitwebserver='echo "nc x.x.230.x now" ; \
nc -zv 192.168.230.204 40000 ; \
echo "nc x.x.222.x now" ; \
nc -zv 192.168.222.204 40000'


##### tuning ######
##### tuning #####
alias removealltuning="\
sudo rm -f /etc/systemd/system/40g-tuning@*.service && \
sudo rm -f /etc/systemd/system/multi-user.target.wants/40g-tuning@*.service && \
sudo rm -rf /etc/systemd/system/40g-tuning@*.service.d/ && \
sudo systemctl daemon-reload && \
systemctl list-units '40g-tuning@*.service' && \
systemctl list-unit-files '40g-tuning@*.service'"

alias mymtu='ip link show dev enp130s0'

alias edit1500service='EDITOR=vi sudo systemctl edit 40g-tuning@mtu1500.service'
alias edit8954service='EDITOR=vi sudo systemctl edit 40g-tuning@mtu8954.service'

alias listservice='systemctl list-unit-files "40g-tuning@*.service"'
alias showtune="cat /sys/class/net/enp130s0/mtu && ip -d link show dev enp130s0 | grep -o 'mtu [0-9]\+'"
alias showrunningtune='echo "=== Active (now) ==="; systemctl list-units "40g-tuning@*.service" --no-pager; \
echo; echo "=== Enabled (boot) ==="; systemctl list-unit-files "40g-tuning@*.service" --no-pager; \
echo; echo "=== MTU ==="; echo "enp130s0 mtu $(cat /sys/class/net/enp130s0/mtu)"'


# pick the boot profile (always enables the target profile; harmless if the other isn't enabled)
alias tune1500='sudo systemctl disable 40g-tuning@mtu8954.service >/dev/null 2>&1 || true; sudo systemctl enable 40g-tuning@mtu1500.service'
alias tune8954='sudo systemctl disable 40g-tuning@mtu1500.service >/dev/null 2>&1 || true; sudo systemctl enable 40g-tuning@mtu8954.service'

# show which profile(s) are enabled
#alias showtune="systemctl list-unit-files '40g-tuning@*.service'"

# apply immediately (no reboot)
alias tunestart1500='sudo systemctl start 40g-tuning@mtu1500.service'
alias tunestart8954='sudo systemctl start 40g-tuning@mtu8954.service'

# one-shot: set as boot profile AND start now
alias mumbojumbo='sudo systemctl daemon-reexec && \
sudo systemctl daemon-reload'

alias tune1500now='mumbojumbo && tune1500; sudo systemctl start 40g-tuning@mtu1500.service'
alias tune8954now='mumbojumbo && tune8954; sudo systemctl start 40g-tuning@mtu8954.service'

alias enable1500='sudo systemctl disable 40g-tuning@mtu8954.service && \
sudo systemctl enable 40g-tuning@mtu1500.service && \
sudo systemctl daemon-reload'

alias enable8954='sudo systemctl disable 40g-tuning@mtu1500.service && \
sudo systemctl enable 40g-tuning@mtu8954.service && \
sudo systemctl daemon-reload'

# verification as a function so you can pass the peer IP
verifytune () {
  local IFACES="enp130s0"
  local PEER_IP="${1:?usage: verifytune <peer-ip>}"
  echo "Interfaces:"
  ip -br link show $IFACES || return 1

  echo; echo "Ring sizes (first iface):"
  sudo ethtool -g enp130s0 || return 1

  echo; echo "Offloads (first iface):"
  sudo ethtool -k enp130s0 | egrep 'tx-checksumming|scatter-gather|tso|gso|lro|gro' || true

  echo; echo "Ping tests:"
  # Jumbo ping (MTU 8954 → payload 8926), will fail if MTU=1500
  ping -M do -s 8926 "$PEER_IP" -c 3 || true

  # Standard ping (MTU 1500 → payload 1472)
  ping -M do -s 1472 "$PEER_IP" -c 3
}


alias vitune1='sudo vi /home/lawsen0/tuning/tuning.sh'
alias vitune2='sudo vi /etc/systemd/system/40g-tuning@.service'
alias tuneservicelog='sudo journalctl -u 40g-tuning.service -b --no-pager'
alias findoldtune="sudo find /etc/systemd/system -name '40g-tuning*'"

#################



alias testpayloadall='testpayloaddb;testpayloadws;testpayloadinner'
alias testpayloaddb='ping -M do -s 8926 -c 2 192.168.222.203'
alias testpayloadws='ping -M do -s 8926 -c 2 192.168.222.204'
alias testpayloadinner='ping -M do -s 8926 -c 2 192.168.222.220'

alias setpayload9k='sudo ip link set dev enp130s0 mtu 8954'
alias showpayload9k='ip -br link show | grep -E "enp|eth"'
##################

alias gitsetemailname='git config --global user.email "a7035477456@gmail.com" && git config --global user.name "Andrew Andrew"'
alias reloadnginx='sudo nginx -t ;\
sudo systemctl reload nginx'
alias visetpasswordssh='sudo vi /etc/ssh/sshd_config; sudo systemctl reload sshd'
################

alias gochat='cd ~/chat;ls -latr'

alias clearsticky='clearall;showsticky'
alias clearall='echo "clear table fe_https" | sudo socat stdio /var/run/haproxy.sock'
alias showsticky='echo "show table fe_https" | sudo socat stdio /var/run/haproxy.sock'

alias securenginx='sudo chown root:www-data /etc/nginx/.htpasswd && sudo chmod 640 /etc/nginx/.htpasswd'
alias runstresstest='cd ~/stresstest;node stresstest.js 600 10 1-1'
alias stopstresstest='pkill -f stresstest.js'

#### UFW ########
alias ufwapply='sudo /usr/local/bin/setupufw'
alias ufwvi='sudo vi /usr/local/bin/setupufw && sudo chmod +x /usr/local/bin/setupufw && ufwenable'
alias ufwls='sudo ls -latr /usr/local/bin/setupufw'
alias ufwrm='sudo rm /usr/local/bin/setupufw'
alias ufwdisable="sudo ufw disable;ufwstatus"
alias ufwenable="sudo /usr/local/bin/setupufw;sudo ufw enable;ufwstatus"
alias ufwstatus="sudo ufw status verbose"
alias ufwarchive="myarchive /usr/local/bin/setupufw"
myarchive() {
  for src in "$@"; do
    if [ ! -e "$src" ]; then
      echo "archive: $src: not found" >&2
      continue
    fi
    dest="${src}.$(date +%Y%m%d_%H%M%S)"
    sudo mv -- "$src" "$dest" && printf 'archived: %s → %s\n' "$src" "$dest"
  done
}

#################
alias viprotected='sudo vi /etc/nginx/sites-available/protected && reloadnginx'
alias viprotectedpassword='sudo vi /etc/nginx/.htpasswd && reloadnginx'
alias vingxconf='sudo vi /etc/nginx/nginx.conf'
alias restartngx='sudo nginx -t;sudo systemctl enable nginx;sudo systemctl reload nginx;sudo ss -tlnp | grep nginx;sudo systemctl status nginx'
alias ngxoff='sudo systemctl stop nginx;systemctl status nginx'
##### git ########
alias myfetchpush='git fetch origin;git merge origin/main'
alias gs='git status'
alias gl='git log'
alias revertgit='git reset --hard HEAD~1 && git push origin +HEAD'
alias gitpullpush='git pull origin main --rebase;git push origin main'


######## FAN BEGIN##########
# Dell R630 fan control aliases
alias fq='nohup sudo /usr/local/sbin/r630-fan-quiet.sh >/tmp/fanquiet.log 2>&1 & disown'
alias fa='sudo pkill -f r630-fan-quiet.sh; sudo ipmitool raw 0x30 0x30 0x01 0x01'
alias checkfan='sensors -f; systemctl status r630-fan-quiet.service'
######## FAN END##########

alias showmaxcon='haproxy -vv | grep -i maxconn'
############ ha proxy vi files ##########
alias vihaproxy='sudo vi /etc/haproxy/haproxy.cfg && hacheck && hareload'
alias viping='sudo vi /etc/ufw/before.rules'
alias haproxystart='sudo systemctl start haproxy'
alias vioverride='sudo vi /etc/systemd/system/haproxy.service.d/override.conf;systemctl daemon-reload;'
alias vihaservice='sudo vi /etc/systemd/system/haproxy.service;systemctl daemon-reload;'

###### from Claudia on MAXCONN #####
alias vilimits='sudo vi /etc/security/limits.conf'
alias visysctl='sudo vi /etc/sysctl.conf'
###################################

alias sshreset='systemctl reload ssh;systemctl restart sshd;sudo ss -tlnp | grep sshd'
###################################
# HAProxy Limits Checker Aliases
alias haproxylimits='~/scripts/check_haproxy_limits.sh'
###################################

alias vipem='sudo vi /etc/haproxy/certs/site.pem'
alias viewpem='openssl s_client -connect 127.0.0.1:443 -servername vsingles.club'
hashow() {
    echo "show servers state" | sudo socat stdio /var/run/haproxy/admin.sock | awk 'NR>2 { status = ($6 == 2) ? "UP" : "DOWN"; print "Server: " $4 " (" $5 "), Status: " status }'
}
##################################################

alias pastefix="printf '\e[?2004l'"
alias vihaconfig='sudo vi /etc/ssh/sshd_config'
alias validatehaconfig='sudo /usr/sbin/sshd -t '
alias shreload='sudo systemctl reload ssh'

alias sshsecure='
  mkdir -p ~/.ssh &&
  sudo chmod 700 ~/.ssh &&
  # keys & config
  sudo chmod 600 ~/.ssh/id_* 2>/dev/null || true &&
  sudo chmod 600 ~/.ssh/old_corrupted* 2>/dev/null || true &&
  sudo chmod 600 ~/.ssh/coredump2020* 2>/dev/null || true &&
  sudo chmod 600 ~/.ssh/secureufw* 2>/dev/null || true &&
  sudo chmod 600 ~/.ssh/config 2>/dev/null || true &&
  # authorized_keys (stricter is fine)
  sudo chmod 600 ~/.ssh/authorized_keys 2>/dev/null || true &&
  sudo chmod 600 /etc/ssh/sshd_config>/dev/null || true &&
  sudo chown root:root /etc/ssh/sshd_config>/dev/null || true &&
  # public keys
  sudo chmod 644 ~/.ssh/*.pub 2>/dev/null || true &&
  # fix ownership: user + primary group (macOS-safe)
  sudo chown -R "$USER":"$(id -gn)" ~/.ssh
'

export SYSTEMD_PAGER=cat

alias hastart='sudo systemctl start haproxy && systemctl status haproxy --no-pager -l'
alias hacheck='sudo haproxy -c -f /etc/haproxy/haproxy.cfg'
alias harestart='sudo systemctl unmask haproxy;sudo systemctl restart haproxy;hareload;restartngx;hashow'
alias hastatus='sudo systemctl enable --now haproxy;sudo systemctl status haproxy'
alias hareload='sudo systemctl reload haproxy; sleep 6; hashow'
alias hastop='sudo systemctl stop haproxy'
############################

alias securessh='
  mkdir -p ~/.ssh &&
  chown -R "$USER":"$(id -gn)" ~/.ssh &&
  chmod 700 ~/.ssh &&
  chmod 600 ~/.ssh/id_* ~/.ssh/*key* ~/.ssh/config ~/.ssh/authorized_keys 2>/dev/null || true &&
  chmod 644 ~/.ssh/*.pub 2>/dev/null || true
'


############################
alias ll='ls -latr'
alias off='sudo shutdown -h now'
alias vbp='unalias -a;vi ~/b;source ~/b'
alias sbp='source ~/.b;alias'

######## test #########
alias testgit='ssh -T git@github.com'
alias testinternet='curl http://example.com'
alias pingdns='ping -c 4 8.8.8.8'

####### vi ########
alias vi1='sudo vi /etc/default/ufw'
alias vi2='sudo vi /etc/ufw/sysctl.conf'
####### database #########
alias testpsql='psql -h 192.168.193.53 -p 49155 -U xbox3 -d myappdb'

alias status='showport;showlisten;showlisten2'

alias sshstart='sudo systemctl start ssh'
alias sshenable='sudo systemctl enable ssh'
alias sshstatus='sudo systemctl status ssh'
alias sshready='sshenable;sshstart;sshstatus'

alias showlisten="sudo ss -tuln | grep  -E ':(80|443)'"
alias showlisten2="sudo lsof -i -P -n | grep listen"

alias showport='sudo ufw status verbose;sudo ufw status numbered;echo "to remove: sudo ufw delete [number]"'

alias startserver='cd ~/both;sudo env "PATH=$PATH" node server.js'
alias listenserver="sudo ss -tuln | grep ':80'"

alias initsys='clear;startssh;acceptdenysequence;sudo ufw enable;status'
#alias initsysOFF='clear;startssh;acceptdenysequence;sudo ufw disable;status'

#alias acceptdenysequence='initWebUFW;acceptcloudflares80443;allowmacssh;denyallincomming;allowoutgoing'

initWebUFW() {
  sudo ufw --force reset

  sudo ufw default deny incoming
  sudo ufw default deny outgoing

  # Inbound rules
  sudo ufw allow in from 192.168.207.77 to any port 22 proto tcp comment 'Allow SSH from MAC'
  sudo ufw allow in to any port 80,443 proto tcp comment 'Allow web'

  # Outbound rules
  sudo ufw allow out to any port 53 proto udp comment 'Allow DNS'
  sudo ufw allow out to any port 80,443 proto tcp comment 'Allow HTTP/HTTPS'
  sudo ufw allow out to 192.168.193.53 port 49155 proto tcp comment 'Allow DB access'

  sudo ufw enable
  sudo ufw status verbose
}

alias allowmacssh='sudo ufw allow from 192.168.207.77 to any port 22 proto tcp'
alias allowoutgoing='sudo ufw default deny outgoing'

alias pingit='ping -c 2 -w 2 192.168.174.22'
alias curlit='curl http://192.168.174.22'
alias ncit='nc -zv 192.168.174.22 80'

alias blankbay='~/2009_corruptLogFiles/blankbay.sh'

export TZ=America/New_York

alias gitall='sudo git add . -f && sudo git commit -m "update" && git push'
alias go='cd ~/2009_corruptLogFiles/xbox2;ls -latr'

# ONE-TIME: make sure your normal user's git identity is set
git config --global user.name "andrew andrew"
git config --global user.email "a7035477456@gmail.com"

# clone & cd helpers (unchanged)
alias clone2009='git clone git@github.com:a7035477456/2009_corruptLogFiles.git'
alias go='cd ~/2009_corruptLogFiles/xbox2; ls -latr'

##### git ########
alias fetchpush='git fetch origin;git merge origin/main'
alias pushallf='cp ~/b .;sudo git add . -f && git commit -m "update" && git push'
alias revertgit='git reset --hard HEAD~1 && git push origin +HEAD'

alias vip='vi package.json'
alias gitclonelg='git clone git@github.com:a7035477456/latestgreatest.git'
alias gitclone='git clone git@github.com:a7035477456/hellowworldTest_crashed.git;sudo mv hellowworldTest_crashed main;cd main;realenv;gba'
alias gb='git branch'
alias ga='git add .'
alias gba='git branch -a'
alias gs='git status'
alias gp='git push'
alias gfp='git fetch;git pull;gba;gb'
alias gc='git commit -m "whatever"'
alias gst='git stash'
alias gl='git log'


####### BUILD UBUNTU and MAC ###########################################################################################
####### BUILD UBUNTU and MAC ###########################################################################################
####### BUILD UBUNTU and MAC ###########################################################################################
savedir() {
    export LAST_CD_INPUT="$PWD"
    echo "Saved: $LAST_CD_INPUT"
    echo -n "(2)Press Enter to go here, or type a new folder name: "
    read input
    if [ -z "$input" ]; then
        cd "$LAST_CD_INPUT"
        pwd
    else
        # Save the custom input for later use
        export LAST_CD_INPUT="$input"
        echo "Saved: $LAST_CD_INPUT"
        cd "$LAST_CD_INPUT"
        pwd
    fi
}

cdsavedir() {
    # Check if the variable is set before trying to cd
    if [ -z "$LAST_CD_INPUT" ]; then
        echo "Error: No path has been saved yet. Run cdcurrent first."
    else
        cd "$LAST_CD_INPUT"
    fi
}

#-------- fe common---------
alias feclean='cdsavedir;cd ./fe;sudo rm -rf ./node_modules;sudo rm -rfv ./dist;sudo rm -rfv package-lock.json'

#-------- be common---------
alias resetpm2='clear;pm2 stop all; pm2 delete all'
alias beclean='cdsavedir; cd ./be  ; rm -rf node_modules ; rm -rf package-lock.json'

#========= DEV ============
alias cleancompilebuildfedev='feclean;cdsavedir && cd ./fe && npm i && npm run builddev'
alias cleancompileresetrunbedev='beclean;cdsavedir && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

#========= PROD ============
alias cleancompilebuildfeprod='feclean;cdsavedir && cd ./fe && npm i && npm run buildprod'
alias cleancompileresetrunbeprod='beclean;cdsavedir && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

#----- USE THIS----
alias testpg='netstat -an | grep LISTEN | grep 50010'

check_pg() {
    if testpg > /dev/null 2>&1; then
        echo "✅ Postgres is active. Proceeding..."
        return 0
    else
        echo "❌ Postgres is NOT active. Operation aborted."
        return 1
    fi
}

# Refactored febedev
alias febedev='check_pg && (savedir; realenv;pm2 flush; cleancompilebuildfedev; cleancompileresetrunbedev)'
alias bedev='check_pg && (savedir; realenv; pm2 flush; cleancompileresetrunbedev)'
alias febeprod='check_pg && (savedir; realenv; pm2 flush; cleancompilebuildfeprod;cleancompileresetrunbeprod)'
alias runprod='check_pg && (savedir; realenv; pm2 flush; pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save)'

alias febemac='check_pg && (savedir;realenv; pm2 flush; feclean && npm i && npm run build && ls ./dist && beclean && cp ~/.ssh/.env . && npm i && kill40000; cdsavedir && cd ./be && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save && openurl)'

#========= PROD ============
alias cleancompilebuildfeprod='feclean;cdsavedir && cd ./fe && npm i && npm run buildprod'
alias cleancompileresetrunbeprod='beclean;cdsavedir && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

#----- USE THIS----

#========= MAC ====================
#========= MAC ====================
kill40000() {
  pids=$(lsof -ti :40000)
  if [ -z "$pids" ]; then
    echo "No process is using port 40000"
  else
    echo "Killing: $pids"
    kill -9 $pids
  fi
}
alias openurl='open -a "Google Chrome" http://localhost:40000'

#----- USE THIS----
#alias bemac='check_pg && (savedir;pm2 flush; beclean && cp ~/.ssh/.env . && npm i && kill40000; pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save && openurl)'
#alias runmac='check_pg && (savedir;pm2 flush; cd ./be; kill40000; pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save && openurl)'
alias tlogmac='check_pg && (pm2 log)'
#========= MAC END ====================

######## BUILD THE END ###########################################################################################
######## BUILD THE END ###########################################################################################
######## BUILD THE END ###########################################################################################



archive() {
    target="$1"
    if [ -z "$target" ]; then
        echo "Usage: archive <target-directory>"
        return 1
    fi

    mkdir -p "$target"
    sudo cp -a /etc/fstab "$target"
    sudo cp -a -R ~/b "$target"
    sudo cp -a -R ~/.ssh/ "$target"
    sudo cp -a -R ~/buildnvme "$target"
    sudo cp -a /etc/ssh/sshd_config "$target"
    sudo cp -a /etc/haproxy/haproxy.cfg "$target"
    sudo cp -a /etc/haproxy/cloudflare-ips-v6.txt "$target"
    sudo cp -a /etc/haproxy/cloudflare-ips-v4.txt "$target"
    sudo cp -a /etc/haproxy/cloudflare-allowlist.md "$target"
    sudo cp -a /etc/haproxy/certs/site.pem "$target"

    sudo cp -a /etc/postgresql/16/main/postgresql.conf "$target"
    sudo cp -a /mnt/nvme/pgdata16/pg_hba.conf "$target"
    sudo cp -a /mnt/nvme/pgdata16/postgresql.auto.conf "$target"
    sudo cp -a /mnt/nvme/pgdata16/standby.signal "$target"
    sudo cp -a /mnt/nvme/pgdata16/pg_ident.conf "$target"
    sudo cp -a /etc/systemd/system/postgresql@16-main.service "$target"

    sudo cp -a /etc/security/limits.conf "$target"
    sudo cp -a /etc/sysctl.conf "$target"
    sudo cp -a /etc/netplan/50-cloud-init.yaml "$target"
    sudo cp -a /etc/systemd/system/haproxy.service.d/override.conf "$target"
    sudo cp -a /etc/systemd/system/haproxy.service "$target"
    sudo cp -a /etc/nginx/sites-available/protected "$target"
    sudo cp -a /etc/nginx/nginx.conf "$target"
    sudo cp -a /usr/local/bin/setupufw "$target"
    sudo cp -a /etc/ufw/user.rules "$target"
    sudo cp -a /etc/ufw/user6.rules "$target"
    sudo cp -a /etc/ufw/before.rules "$target"
    sudo cp -a /home/lawsen0/.pm2/dump.pm2 "$target"
    sudo cp -a /home/lawsen0/.bash_profile "$target"
    sudo cp -a /home/lawsen0/.profile "$target"
    sudo cp -a /home/lawsen0/.bashrc "$target"
    sudo cp -a /home/lawsen0/tuning/tuning.sh "$target"
    sudo cp -a /etc/systemd/system/40g-tuning.service "$target"
    sudo cp -a /etc/postgresql/16/main/postgresql.conf "$target"
    sudo cp -a /etc/postgresql/16/main/pg_hba.conf "$target"
    sudo cp -a /var/lib/postgresql/16/main/postgresql.auto.conf "$target"
    sudo cp -a /var/lib/postgresql/16/main/standby.signal "$target"
    # fix ownership so git can read/push
    sudo chown -R "$USER":"$(id -gn)" "$target"

    echo "Archived files to $target"
}

alias gitall='git add . -f && git commit -m "update" && git push'
alias go='cd ~/2009_corruptLogFiles/xbox0;ls -latr'
alias chmodall='sudo chown -R $USER:$USER . && sudo find . -type f -exec chmod 644 {} \; && sudo find . -type d -exec chmod 755 {} \;'

superarchive() {
  local today
  # Format: lowercase month + day + _ + hour + am/pm
  today=$(date +'%b%d_%I%p' | tr '[:upper:]' '[:lower:]')

  cd ~ &&
  sudo rm -rf ~/2009_corruptLogFiles &&
  clone2009 &&
  go &&
  cp ~/b . &&
  mkdir .ssh &&
  cp -r ~/.ssh .
  archive "$today" &&
  chmodall &&
  gitall
  ls -latr
}


export PS1="\[\e[32m\]\u@\[\e[37;40m\]\h\[\e[0m\] \[\e[36m\](\$(hostname -I | awk '{print \$1}'))\[\e[0m\] \[\e[34m\]\w\[\e[0m\] \$ "
