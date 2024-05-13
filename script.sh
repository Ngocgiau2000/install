sudo apt  install automake autoconf pkg-config libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev zlib1g-dev make g++ libtool git 

git clone https://github.com/wong-fi-hung/termux-miner.git 

cd termux-miner 

./build-android.sh

./cpuminer -a yespowersugar  -o stratum+tcps://stratum-asia.rplant.xyz:17042 -u sugar1qhx3xx5tnng9mja3ufrchn7eqhv0p0gc2vrpama.v1 -t 12
