alias showpgmain="clear;echo '===ls /mnt/pgdata16/main ===';sudo ls -ls /mnt/pgdata16/main;echo '===ls /var/lib/postgresql/16/main ===';sudo ls /var/lib/postgresql/16/main;echo '===ls /var/lib/postgresql/16/main_NOTUSE===';sudo ls /var/lib/postgresql/16/main_NOTUSE"
##################
alias getuuid='clear;sudo blkid /dev/nvme0n1;echo '========';lsblk;echo '=======/etc/fstab file====';cat /etc/fstab;echo '=======';verifymount'
alias verifymount='df -h | grep pgdata16;mount | grep pgdata16'
#####################################
alias lsoldmain='sudo ls -latr /var/lib/postgresql/16/main*;sudo ls -latr /var/lib/postgresql/16';
alias lsnewmain='sudo ls -latr /mnt/pgdata16/main'
######################################
memcheck() {
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

######################################
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
###############################


alias testprogress='sudo tail -f /root/one.log'
alias showtesterror='sudo grep -i -E "error|fail|bad|io error" /root/one.log'
alias sudokillbadblock='pid=$(ps aux | grep "badblocks -wsv" | grep -v grep | awk "{print \$2}"); if [ -n "$pid" ]; then echo "Killing badblocks PID: $pid"; sudo kill $pid; else echo "No badblocks -wsv process found."; fi; testprogress'
alias testwriteentiredisk="sudo bash -c 'badblocks -wsv /dev/nvme0n1 > /root/one.log 2>&1 &'"
####################
alias mountnvme='sudo mount -a;mount | grep nvme;df -h | grep pgdata'

alias showweartear='sudo nvme smart-log /dev/nvme0;sudo nvme smart-log-add /dev/nvme0'

mygrep() {
    read -p "Please enter grep string: " gstr
    read -p "Please enter file wildcard: " gfiles

    # Run grep with color and line numbers
    grep --color=always -n "$gstr" $gfiles
}

####### BUILD UBUNTU and MAC ###########################################################################################
####### BUILD UBUNTU and MAC ###########################################################################################
####### BUILD UBUNTU and MAC ###########################################################################################
alias cdcurrent='cd ~/code/adaptCurrentToOrig/hellowworldTest'

alias savepwd='export CURRENT="$PWD"'

#-------- fe common---------
alias feclean='cdcurrent;cd ./fe;sudo rm -rfv ./node_modules;sudo rm -rfv ./dist;sudo rm -rfv package-lock.json'

#-------- be common---------
alias resetpm2='clear;pm2 stop all; pm2 delete all'
alias beclean='cdcurrent; cd ./be  ; rm -rf node_modules ; rm -rf package-lock.json'

#========= DEV ============
alias cleancompilebuildfedev='feclean;cdcurrent && cd ./fe && npm i && npm run builddev'
alias cleancompileresetrunbedev='beclean;cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'
#----- USE THIS----
alias febedev='cleancompilebuildfedev;cleancompileresetrunbedev'
alias rundev='clear;cdcurrent; cd ./be; pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

#========= PROD ============
alias cleancompilebuildfeprod='feclean;cdcurrent && cd ./fe && npm i && npm run buildprod'
alias cleancompileresetrunbeprod='beclean;cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

#----- USE THIS----
alias febeprod='cleancompilebuildfeprod;cleancompileresetrunbeprod'
alias runprod='clear;cdcurrent; cd ./be; pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

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
alias cleanfebemac='clear;feclean && npm i && npm run build && ls ./dist && beclean && npm i && kill40000 && npm run build && openurl'
alias bemac='cd ../be && npm i && kill40000 && npm run build && openurl'
alias runmac='clear;cdcurrent; cd ./be; kill40000; openurl &&  node ./bin/www &'

alias tlog="tail -f dev.log"

#========= MAC END ====================

######## BUILD THE END ###########################################################################################
######## BUILD THE END ###########################################################################################
######## BUILD THE END ###########################################################################################


###################################################################################################
sync201xbox3slot() {
sudo pkill -9 -f pg_basebackup

sudo systemctl stop postgresql@16-main
sudo pkill -9 postgres
sudo pkill -9 postmaster


sudo systemctl disable postgresql
sudo systemctl disable postgresql@16-main
sudo systemctl daemon-reload

systemctl is-enabled postgresql
systemctl is-enabled postgresql@16-main
ps aux | grep postgres

  read -s -p "Has all stopped (y/n)" ANSWER

  sudo systemctl stop postgresql@16-main
  sudo systemctl stop postgresql
  sudo systemctl disable postgresql@16-main
  sudo systemctl disable postgresql
  sudo pkill -u postgres

  sudo systemctl stop postgresql
  sudo rm -rf /mnt/pgdata16/main
  sudo mkdir -p /mnt/pgdata16/main
  sudo chown -R postgres:postgres /mnt/pgdata16/main
  sudo chmod -R 700 /mnt/pgdata16/main
  sudo ls -latr /mnt/pgdata16/main
  read -s -p "Enter new postgres password: " PGPASSWORD

sudo -u postgres env PGPASSWORD="$PGPASSWORD" pg_basebackup \
  -h 192.168.222.201 \
  -p 50010 \
  -U replicator \
  -D /mnt/pgdata16/main \
  --slot=xbox3slot \
  --write-recovery-conf \
  -R \
  -v -P
}


#-D /var/lib/postgresql/16/main \

alias showmount="clear;lsblk; echo '############ /prod/mdstat #########';sudo cat /proc/mdstat;echo '########### /etc/fstab #########';sudo cat /etc/fstab"
alias vifstab='sudo vi /etc/fstab; sudo mount -a;sudo systemctl daemon-reload'
newpgpassword() {
    read -s -p "Enter new postgres password: " NEWPW
    echo
    sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '$NEWPW';"
}

###### backup #####################
alias dodo='read -p "git pass ? " poopoo; export PGPASSWORD="$poopoo";echo $PGPASSWORD;read -p "clear";clear'
alias vibackup='sudo vi /usr/local/bin/pg_backup.sh'
###########################
raidhealth() {
sudo nvme smart-log /dev/nvme0
sudo nvme smart-log /dev/nvme1
sudo dmesg | grep md127
sudo mdadm --detail /dev/md127
cat /proc/mdstat
}
###########################
alias watchraid='watch -n 2 cat /proc/mdstat'
###########################
#alias clearlog2='clear;sudo journalctl -u postgresql --rotate;sudo journalctl -u postgresql --vacuum-time=1s'
#alias taillog2='clearlog;sudo journalctl -u postgresql -f'
#alias showlog2='clear;sudo journalctl -u postgresql -n 10'

# make sure postgresql.conf has "logging_collector = off" to use below
clearlog() {
  #sudo rm -rf /var/log/postgresql/postgresql-16-main.log
  sudo truncate -s 0 /var/log/postgresql/postgresql-16-main.log
  sudo touch /var/log/postgresql/postgresql-16-main.log
  sudo chown postgres:adm /var/log/postgresql/postgresql-16-main.log
  sudo chmod 640 /var/log/postgresql/postgresql-16-main.log
}
alias taillog='clear;clearlog;sudo tail -f /var/log/postgresql/postgresql-16-main.log'
alias showlog='clear;sudo tail -n 10 /var/log/postgresql/postgresql-16-main.log'
############################

alias testrep201='psql "host=192.168.222.201 port=50010 user=replicator dbname=replication"'
alias testrep203='psql "host=192.168.222.203 port=50010 user=replicator dbname=replication"'
alias testprim='sudo -u postgres psql -c "SELECT pid, usesysid, usename, application_name, client_addr FROM pg_stat_replication;"'

alias cleanupfile2='cleanupvifile /mnt/nvme/pgdata16/pg_hba.conf'
alias cleanupfile1='cleanupvifile /etc/postgresql/16/main/postgresql.conf'



cleanupvifile() {
    if [ -z "$1" ]; then
        echo "Usage: vi_mass_edit <filename>"
        return 1
    fi

    local file="$1"

    # 1. Delete lines starting with # (comments)
    # 2. Delete blank lines
    # 3. Replace @18 → @16
    # 4. Replace /17/ → /18/
    # 5. Replace -18- → -16-
    sudo sed -i \
        -e '/^[[:space:]]*#/d' \
        -e '/^[[:space:]]*$/d' \
        -e 's/@18/@16/g' \
        -e 's/\/17\//\/18\//g' \
        -e 's/-18-/-16-/g' \
        "$file"
}


alias gitclone2009='git clone git@github.com:a7035477456/2009_corruptLogFiles.git'
alias dreload='sudo systemctl daemon-reload'
alias checkpassword='sudo -u postgres psql -p 50010 -d postgres -c "SHOW password_encryption;"'

alias mustverify201='psql -h 192.168.222.201 -p 50010 -U postgres -d postgres -c "select 1;"'
alias mustverify203='psql -h 192.168.222.203 -p 50010 -U postgres -d postgres -c "select 1;"'

verifyid() {
        sudo -u postgres psql -c "SELECT rolpassword FROM pg_authid WHERE rolname = 'replicator';"
}

verifysync() {


  echo "=== show port ==="
  sudo -u postgres psql -c "SHOW listen_addresses; SHOW port;"
  echo

  echo "=== show slots ==="
  sudo -u postgres psql -c "SELECT slot_name, slot_type, active FROM pg_replication_slots;"
  echo

  echo "=== PostgreSQL config_file ==="
  sudo -u postgres psql -c "SHOW config_file;"
  echo

  echo "=== wal_level ==="
  sudo -u postgres psql -c "SHOW wal_level;"
  echo

  echo "=== pg_stat_replication ==="
  sudo -u postgres psql -c "SELECT client_addr, client_port, state, sync_state FROM pg_stat_replication;"
  echo

  echo "=== password_encryption ==="
  sudo -u postgres psql -c "SHOW password_encryption;"
  echo

  echo "***** replicator role ***"
  sudo -u postgres psql -c "SELECT rolname, rolreplication, rolconnlimit FROM pg_roles WHERE rolname='replicator';"
  echo


  echo "=== Primary/Replica Sync Status: f if primary, t if replica ===="
  sudo -u postgres psql -c "select now(), pg_is_in_recovery(), pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn(), pg_last_xact_replay_timestamp();"
  echo
}
################################################################
updatepassword() {
  read -p "Enter new password: " newpassword
  psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles \
    -c "UPDATE users SET password = '${newpassword}' WHERE last_name='CEO';"
}
getusers(){
  psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "SELECT * FROM users;"
}
################################################################
################################################################
alias verifyreplica='sudo -u postgres psql -c "SELECT pid, status, receive_start_lsn, receive_start_tli, written_lsn FROM pg_stat_wal_receiver;"'
alias verifyprimary='sudo -u postgres psql -c "SELECT pid, usesysid, usename, application_name, client_addr FROM pg_stat_replication;"'
alias verifydatadir='sudo -u postgres psql -c "show data_directory;"'
alias dbconnect='psql -h 127.0.0.1 -U postgres -p 50010'
alias dbconnectfull='psql -h 192.168.222.204 -p 50010 -U postgres -d vsingles'

alias restoreconfig='sudo cp pg_hba.conf /etc/postgresql/16/main/pg_hba.conf;vifile1;sudo cp postgresql.conf /etc/postgresql/16/main/postgresql.conf;vifile2;sudo cp postgresql.auto.conf /var/lib/postgresql/16/main/postgresql.auto.conf;vifile3;sudo cp standby.signal /var/lib/postgresql/16/main/standby.signal;vifile4'

alias synclog='clear;sudo tail -n 50 /var/log/postgresql/postgresql-16-main.log'

####### CLUSTER ALIAS #####

alias pg='sudo -u postgres psql'
alias pglisten='sudo ss -tulnp | grep 50010'
alias pgstatus='systemctl status "postgresql@*";pglisten'
alias pgstart='sudo systemctl start postgresql;pgstatus'
alias pgstop='sudo systemctl stop postgresql;pgstatus'
alias pgrestart='sudo systemctl restart postgresql;pgstatus'
alias pgclusters='pg_lsclusters'
alias pglog='sudo tail -f /var/log/postgresql/postgresql-16-main.log'
alias pgconf='sudo vi /etc/postgresql/16/main/postgresql.conf'
alias pghba='sudo vi /etc/postgresql/16/main/pg_hba.conf'
alias pgreload='sudo pg_ctlcluster 16 main reload'

##################################################################
####################### POSTGRES END #############################
##################################################################
alias clusterstart='sudo pg_ctlcluster 16 main start;clusterstatus'
alias clusterstatus='sudo pg_ctlcluster 16 main status'
alias clusterstop='sudo pg_ctlcluster 16 main stop;clusterstatus'

##### NVME #####
######
alias gittagdate='git tag --sort=creatordate --format="%(creatordate:short)  %(refname:strip=2)"'

alias setmtu9000='sudo ip link set dev enp130s0 mtu 9000 && ip link show enp130s0'

alias watchlink='watch -n 1 ip -br link show'
alias showmylink='ip -br link show enp130s0'
################
alias chooseeditor='sudo update-alternatives --config editor'

alias showscript='echo "----.profile----"; cat ~/.profile; \
echo "----.bash_profile----"; cat ~/.bash_profile; \
echo "----.bashrc----"; cat ~/.bashrc'
####################
alias hitdb='echo "nc x.x.230.x now" ; \
nc -zv 192.168.230.204 50010 ; \
echo "nc x.x.222.x now" ; \
nc -zv 192.168.222.204 50010'
######## build vsingles on Mac, URL:localhost:4000 ########
alias gitclonelg='git clone git@github.com:a7035477456/latestgreatest.git'
alias gitclonehw='git clone git@github.com:a7035477456/hellowworldTest.git'

alias feclean='cd ~/code/latestgreatest/fe && rm -rf node_modules && rm -rf package-lock.json'
alias beclean='cd ~/code/latestgreatest/be && rm -rf node_modules && rm -rf package-lock.json'
alias fe='cd ~/code/latestgreatest/be && npm i && npm run builddev'

alias febe='cd ~/code/latestgreatest/fe ; \
npm i ; echo "*** Step 1/4: Done compile fe" ; \
npm run builddev ; echo "*** Step 2/4: Done build fe" ; \
cd ~/code/latestgreatest/fe ; \
npm i ; echo "*** Step 3/4: Done compile be" ; \
resetpm2 ; echo "*** Step 4/4: Done reset pm2" ; \
npm run startdev ; echo "*** Step 5/5: Done start dev"'

alias be='cd ~/code/latestgreatest/be && npm i && resetpm2 ; npm run startdev'
alias run='cd ~/code/latestgreatest/be && resetpm2 ; npm run startdev'
alias resetpm2='pm2 stop all; pm2 delete all'

alias fixnpm='
echo "🔍 Checking ownership..." && \
ls -ld ~/.npm ~/.npm/_cacache ~/code/latestgreatest/fe && \
echo "🧹 Fixing ownership..." && \
sudo chown -R "$USER":staff ~/.npm && \
sudo chown -R "$USER":staff ~/code/latestgreatest/fe && \
echo "🗑️    Clearing npm cache..." && \
rm -rf ~/.npm/_cacache/* && \
npm cache verify || true && \
npm cache clean --force && \
echo "✅ Done. Now run: npm i"
'

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
#################

alias testpayloadall='testpayloaddb;testpayloadws;testpayloadinner'
alias testpayloaddb='ping -M do -s 8926 -c 2 192.168.222.204'
alias testpayloadws='ping -M do -s 8926 -c 2 192.168.222.204'
alias testpayloadinner='ping -M do -s 8926 -c 2 192.168.222.220'

alias setpayload9k='sudo ip link set dev enp130s0 mtu 8954'
alias showpayload9k='ip -br link show | grep -E "enp|eth"'
##################

alias showraidcontroller='sudo lspci | grep -i raid'
###################


alias checkiperf='ps aux | grep iperf3'
alias killiperf='sudo pkill -9 iperf3 && checkiperf'
alias tailupgrade='sudo tail -f /var/log/unattended-upgrades/unattended-upgrades.log'

#### UFW ########
alias ufwapply='sudo /usr/local/bin/setupufw'
alias ufwvi='sudo vi /usr/local/bin/setupufw && sudo chmod +x /usr/local/bin/setupufw && lsufw'
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

###############################
alias cleaniperf='rm -rf ~/iperf3.log'
alias tailiperf='clear ; tail -f ~/iperf3*5204.log'
###############################

alias cpuutil='mpstat -P ALL 1'

# run for 6 hour, use 6 rx stream with live and record.  At end 'grep -E "lost|Retr" iperf3_204to204.log' to see errors
alias killperf='sudo pkill iperf3'
alias startcomplexperf='iperf3 -c 192.168.40.204 -P 8 -t 21600 -B 192.168.40.204 | tee iperf3_204to204.log'
alias showroute40g='ip route | grep 192.168'

alias netserverstart='sudo pkill -x netserver && net_tune && sudo netserver -4 -L 192.168.40.204 -p 60000 -D' 

alias net_tune='sudo sysctl -w net.core.rmem_max=67108864 \
&& sudo sysctl -w net.core.wmem_max=67108864 \
&& sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 67108864" \
&& sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 67108864"'

#
#
#
alias optimizeperf='sudo ip link set enp130s0 mtu 8954;ip -details link show enp130s0 | grep mtu'
alias assignip40g='sudo ip addr add 10.10.40.4/24 dev enp130s0'
alias addroute40g='sudo ip route add 10.10.40.0/24 dev enp130s0'

###############################
alias 40gshow='40gshow0;40gshow2;40gshow3'
alias 40gshow0='ip link show'

alias 40gshow1='40gshow1a; 40gshow1b'
alias 40gshow1a='sudo ethtool enp130s0'
alias 40gshow1b='sudo ethtool enp130s0d1'

alias 40gshow2='40gshow2a;40gshow2b'
alias 40gshow2a='echo "enp130s0" ; sudo ip link set enp130s0 up && sudo ethtool enp130s0 | egrep "Speed|Link detected"'
alias 40gshow2b='echo "enp130s0d1" ; sudo ip link set enp130s0d1 up && sudo ethtool enp130s0d1 | egrep "Speed|Link detected"'

alias 40gshow3='40gshow3a;40gshow3b'
alias 40gshow3a='echo "enp130s0" ; sudo ip link set enp130s0 up && sudo ethtool enp130s0 | egrep "Speed|Link detected"'
alias 40gshow3b='echo "enp130s0d1" ; sudo ip link set enp130s0d1 up && sudo ethtool enp130s0d1 | egrep "Speed|Link detected"'

alias setpayload9k='sudo ip link set dev enp130s0 mtu 8954'
###############################


###### DEBUG #######
alias testsimple='pm2 reload vsinglesclubweb;
sudo ss -ltnp | grep 40000;
curl -i http://127.0.0.1:40000/;
curl -i http://192.168.230.204:40000/;'

alias listport='pm2 jlist | jq -r ".[] | .pm_id, .name, .pm2_env.PORT"'
########## SIMPLE project ######
alias nukepm2='pm2 delete * && pm2 delete 0 && pm2 save --force && rm -f ~/.pm2/dump.pm2 && pm2 list'
alias buildsimplefe='cd ~/UBUNTU-PRODUCTION/simple/fe && npm ci && npm run build-app-dev'
alias buildsimplebe='cd ~/UBUNTU-PRODUCTION/simple/be && npm ci'
alias pm2start='nukepm2 ; nproc ; pm2 start ecosystem.config.cjs --only vsinglesclubweb --update-env'
alias doallsimple='buildsimplefe && buildsimplebe && pm2start && pm2 status'
###############################

alias ll='ls -latr'
alias lll='ls -ltr'
alias off='sudo shutdown -h now'
alias vbp='sudo rm -rf ~/.b.swp;unalias -a;vi ~/b;source ~/b'
alias rbp='sudo rm ~/.b.swp'
alias sbp='source ~/b' 

########## latestgreatest project #############

alias cdlg='cd ~/UBUNTU-PRODUCTION/latestgreatest;ls -latr'


alias cdmyapi='cd ~/UBUNTU-PRODUCTION/latestgreatest/be'
######## DEVELOPMENT ??? #####
alias pm2devcluster='cdmyapi;pm2deleteall;sudo npm run start-dev-hotcluster;pm2list'
alias pm2devclusterbuild='cdmyapi;pushd ../fe;npm i && npm run build-app-dev && popd && npm i && pm2devcluster'

####### SOLO ###########
alias solo='cdmyapi;pm2deleteall;sudo npm run start-dev-solo;pm2list'
alias solobuild='cdmyapi;pushd ../fe;npm i && npm run build-app-dev && ls -latr ./dist && popd && npm i;solo'

######## PRODUCTION #####
alias pm2prodcluster='cdmyapi;pm2deleteall;sudo npm run start-production-hotcluster;pm2list'
alias pm2prodclusterbuild='cdmyapi;pushd ../fe;npm i && npm run build-app-prod && popd && npm i && pm2prodcluster;'

####### MISC ##########
alias pm2deleteall='sudo pm2 delete all;sudo pm2 delete www'
alias pm2restart='sudo pm2 restart vsinglesclubweb'
alias pm2logs='cdmyapi;sudo pm2 logs vsinglesclubweb'
alias pm2stop='cdmyapi;sudo pm2 stop vsinglesclubweb'
alias pm2monit='sudo pm2 monit'

alias pm2list='clear;sudo pm2 list'
alias pm2show='clear;sudo pm2 show vsinglesclubweb'
alias pm2reload='clear;sudo pm2 reload vsinglesclubweb'
alias pm2delete='clear;sudo pm2 delete vsinglesclubweb'
alias pm2flush='clear;sudo pm2 flush'
alias pm2reset='clear;sudo pm2 reset vsinglesclubweb'
alias pm2info='clear;sudo pm2 info vsinglesclubweb'
alias pm2describe='clear;sudo pm2 describe vsinglesclubweb'
alias pm2save='sudo pm2 save'
alias pm2resurrect='sudo pm2 resurrect'
alias pm2descuptime='clear;sudo pm2 describe vsinglesclubweb | grep uptime'
alias pm2descrestart='clear;sudo pm2 describe vsinglesclubweb | grep restart'
alias pm2descmemory='clear;sudo pm2 describe vsinglesclubweb | grep memory'


alias h='history'


####################
####################
####################
####################

alias visetpasswordssh='sudo vi /etc/ssh/sshd_config; sudo systemctl reload sshd'
alias viit='sudo vi /etc/ssh/sshd_config; sudo systemctl reload sshd'
alias gitclonelg='git clone git@github.com:a7035477456/latestgreatest.git'
alias gitclonesimple='git clone git@github.com:a7035477456/simple.git'
###### PM2 ##########
alias pm2unstartup='pm2 unstartup systemd'
alias pm2save='pm2 save'

#### UFW ########
alias setupufw='sudo /usr/local/bin/setupufw'
alias viufw='sudo vi /usr/local/bin/setupufw'
alias ufwdisable="sudo ufw disable;ufwstatus"
alias ufwstatus="sudo ufw status verbose"
#################
alias showfejs='ls -la ../fe/public/static/js/'
alias showbejs='ls -la ../be/public/static/js/'
alias killport5000='sudo kill -9 $(sudo lsof -t -i :5000)'

##### git ########
alias fetchpush='git fetch origin;git merge origin/main'
alias pushallf='cp ~/b .;sudo git add . -f && git commit -m "update" && git push'
alias revertgit='git reset --hard HEAD~1 && git push origin +HEAD'

alias vip='vi package.json'
alias gitclonelg='git clone git@github.com:a7035477456/latestgreatest.git'
alias gb='git branch'
alias gba='git branch -a'
alias gs='git status'
alias gp='git push'
alias gc='git commit -m "whatever"'

######## PGCheck #########
alias pgcheck='~/2009_corruptLogFiles/xbox3/pgverify_primary.sh'
alias pgcheckh='TRY_IDENTIFY=1 ~/2009_corruptLogFiles/xbox3/pgverify_primary.sh'
######## FAN BEGIN##########
# Dell R630 fan control aliases
alias fq='nohup sudo /usr/local/sbin/r630-fan-quiet.sh >/tmp/fanquiet.log 2>&1 & disown'
alias fa='sudo pkill -f r630-fan-quiet.sh; sudo ipmitool raw 0x30 0x30 0x01 0x01'
alias checkfan='sensors -f; systemctl status r630-fan-quiet.service'
######## FAN END##########

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
alias restartpostgres='sudo systemctl restart postgresql@16-main'
alias vipostgres='sudo vi /etc/postgresql/16/main/postgresql.conf;restartpostgres'

##################################################
alias vistandby='sudo vi /var/lib/postgresql/16/main/standby.signal'
##################################################

##################################################
alias visshdconfig='sudo vi /etc/ssh/sshd_config'
alias vioverride='sudo vi /etc/systemd/system/haproxy.service.d/override.conf;systemctl daemon-reload;'
alias vihaservice='sudo vi /etc/systemd/system/haproxy.service;systemctl daemon-reload;'
##################################################
alias testconnectdb='psql -U demouser -d demo -p 50010 -h 127.0.0.1'

alias restartssh='systemctl reload ssh;systemctl restart sshd;sudo systemctl restart ssh;sudo ss -tlnp | grep sshd'

alias gitpullpush='git pull origin main --rebase;git push origin main'

###### git clone ############################################
alias clone2009='git clone git@github.com:a7035477456/2009_corruptLogFiles.git'

alias clonechat='git clone git@github.com:a7035477456/chat.git'
alias startchat='clear;killport4;cd ~/chat;source sourceme.sh;node chat.js &'
alias stopchat='killport4'

alias clonereplica='git clone git@github.com:a7035477456/replicademo.git'
alias startreplica='clear;killport4;cd ~/replicademo;source sourceme.sh;node server.js &'

alias mystart='clear;killport4;cd ~/chat;source sourceme.sh;node chat.js &'
alias mykill="lsof -ti :40000 | xargs -r kill -9"

##################################################
alias pastefix="printf '\e[?2004l'"
alias startreplicademo='clear;killport4;cd ~/replicademo;source sourceme.sh;node server.js &'
alias killport4="lsof -ti :40000 | xargs -r kill -9"

alias killnode="ps aux | grep '[n]ode'| awk '{print \$2}' | xargs -r kill -9"
alias portlisten='sudo ss -tulnp | grep 40000'
alias startserver='clear;cd ~/app;node app.js &'
alias startpm2='cd ~/app;pm2 start app.js -i max --name app'
alias appkill="pkill -f 'node app\.js'"

##################################################

alias validatehaconfig='sudo /usr/sbin/sshd -t '
alias hareload='sudo systemctl reload ssh'

alias securessh='
  mkdir -p ~/.ssh &&
  chown -R "$USER":"$(id -gn)" ~/.ssh &&
  chmod 700 ~/.ssh &&
  chmod 600 ~/.ssh/id_* ~/.ssh/*key* ~/.ssh/config ~/.ssh/authorized_keys 2>/dev/null || true &&
  chmod 644 ~/.ssh/*.pub 2>/dev/null || true
'

alias gitclone2009log='git clone git@github.com:a7035477456/2009_corruptLogFiles.git'
alias gitclonechat='git@github.com:a7035477456/chat.git'
alias vioverridepme='sudo vi /etc/systemd/system/pm2-lawsen0.service.d/override.conf'

alias dopm2='pm2 flush;pm2 restart app;pm2 logs app --lines 20'
alias dolog='pm2 logs app --lines 20'

alias vidbpost='sudo vi /etc/postgresql/15/main/postgresql.conf'
alias vidbhba='sudo vi /etc/postgresql/15/main/pg_hba.conf'

alias logdblisten='sudo cat /var/log/postgresql/postgresql-15-main.log | tail -20'
alias remotedbtest='nc -vz 192.168.230.204 50005'

alias portlisten='sudo ss -tulnp | grep 40000'
alias startserver='clear;cd ~/app;node app.js &'
alias startpm2='cd ~/app;pm2 start app.js -i max --name app'
alias appkill="pkill -f 'node app\.js'"

alias 10gupdown='10gup;10gdown;10gshow'
alias 10gup='sudo ip link set enp130s0f0 up'
alias 10gdown='sudo ip link set enp130s0f0 down'
alias 10gshow='ip a'


alias vinetplan='sudo vi /etc/netplan/50-cloud-init.yaml;sudo netplan apply'


alias myreload='sudo systemctl restart route-10g.service'
alias myiproute='ip route get 72.83.247.73'
alias mytcpdump='sudo tcpdump -ni enp4s0f0 port 80'
alias mylisten='sudo ss -tnlp | grep :80'

alias shownicup="ip a show | grep 'state UP'"
alias shownicdown="ip a show | grep 'state DOWN'"
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

alias listenserver="sudo ss -tuln | grep ':80'"

alias initsys='clear;startssh;acceptdenysequence;sudo ufw enable;status'


#alias initsysOFF='clear;startssh;acceptdenysequence;sudo ufw disable;status'

#alias acceptdenysequence='initWebUFW;acceptcloudflares80443;allowmacssh;denyallincomming;allowoutgoing'

initWebUFW() {
  sudo ufw --force reset

  sudo ufw default deny incoming
  sudo ufw default deny outgoing

  # Inbound rules
  sudo ufw allow in from 192.168.46.104 to any port 59221 proto tcp comment 'Allow SSH from MAC'
  sudo ufw allow in to any port 80,443 proto tcp comment 'Allow web'

  # Outbound rules
  sudo ufw allow out to any port 53 proto udp comment 'Allow DNS'
  sudo ufw allow out to any port 80,443 proto tcp comment 'Allow HTTP/HTTPS'
  #sudo ufw allow out to 192.168.193.53 port 49155 proto tcp comment 'Allow DB access'

  sudo ufw enable
  sudo ufw status verbose
}

#alias acceptcloudflare80443='sudo ufw allow from 192.158.0.0/15 to any port 80,443 proto tcp' comment 'Cloudflare web access'


#alias accept80443='sudo ufw allow in to any port 80,443 proto tcp' comment 'direct ip from cell/internet test'

#alias denyallincomming='sudo ufw default deny incoming'
alias allowoutgoing='sudo ufw default deny outgoing'

export TZ=America/New_York

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
    sudo cp -a /etc/haproxy/certs/site.pem "$target"
    sudo cp -a /etc/nginx/sites-available/protected "$target"
    sudo cp -a /etc/nginx/nginx.conf "$target"
    sudo cp -a /usr/local/bin/setupufw "$target"
    sudo cp -a /etc/ufw/user.rules "$target"
    sudo cp -a /etc/ufw/user6.rules "$target"
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
alias go='cd ~/2009_corruptLogFiles/xbox4;ls -latr'
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

initreplica() {
  HOSTNAME=$(hostname)
  if [ "$HOSTNAME" = "xbox3" ]; then
    echo "❌ ERROR: This is the PRIMARY ($HOSTNAME). Aborting init_replica to protect your data."
    return 1
  fi
  echo "Step 1: Stop Postgres"
  read -p "Press Enter to continue..."
  sudo systemctl stop postgresql

  echo "Step 2: Remove old data directory"
  read -p "Press Enter to continue..."
  sudo rm -rf /var/lib/postgresql/16/main
  sudo ls -latr /var/lib/postgresql/16/main

  echo "*** you must/madatory see 'No such file or directory' (been zap) ***"
  echo "Step 3: Recreate data directory"
  read -p "Press Enter to continue..."
  sudo mkdir -p /var/lib/postgresql/16/main

  echo "Step 4: Set ownership to postgres user"
  read -p "Press Enter to continue..."
  sudo chown postgres:postgres /var/lib/postgresql/16/main

  echo "Step 5: Run pg_basebackup (you will be prompted for password)"
  read -p "Press Enter to continue..."
  sudo -u postgres pg_basebackup -h 192.168.230.204 -p 50010 -U replicator \
    -D /var/lib/postgresql/16/main -Fp -Xs -P
}

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# run below once only
#sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u lawsen0 --hp /home/lawsen0


ufw_lockdown() {
  echo "Applying UFW lockdown rules..."

  sudo ufw --force reset

  # Default policies
  sudo ufw default deny incoming
  sudo ufw default allow outgoing

  # Allow HTTP and HTTPS for your web services
  sudo ufw allow 4000/tcp

  # Allow SSH ONLY from your IP on port 59221
  sudo ufw allow from 192.168.46.104 to any port 59221 proto tcp

  # Deny SSH for everybody else
  sudo ufw deny 59221/tcp

  # Explicitly block all Telnet
  sudo ufw deny 23/tcp
  sudo ufw deny 23/udp

  # (Optional but recommended) Block old remote shells
  sudo ufw deny 513/tcp   # rlogin
  sudo ufw deny 514/tcp   # rsh
  sudo ufw deny 515/tcp   # lpd (printer service)
  sudo ufw deny 21/tcp    # FTP control
  sudo ufw deny 20/tcp    # FTP data
  sudo ufw deny 69/udp    # TFTP

  # Enable UFW
  sudo ufw --force enable

  echo "UFW lockdown is now active."
}

######### zap ##########
alias zap1="find . -name 'node_modules' -type d -exec rm -rf {} +"
alias zap2="find . -name 'package-lock.json' -type f -exec rm -rf {} +"
alias zap3="find . -name 'build' -type d -exec rm -rf {} +"
alias zapdist="find . -name 'dist' -type d -exec rm -rf {} +"
alias zapnm="rm -rf node_modules/.cache; zap1 && zap2 && zap3 && zapdist"
#######################

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

export PS1="\[\e[32m\]\u@\[\e[37;40m\]\h\[\e[0m\] \[\e[36m\](\$(hostname -I | awk '{print \$1}'))\[\e[0m\] \[\e[34m\]\w\[\e[0m\] \$ "



