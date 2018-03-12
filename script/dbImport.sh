#!/bin/bash
# 还原数据库

# 暂存开始时间
start=$(date +%s)

if [ $# -eq 0 ]
then
    echo "Usage : $0 [JSON Fullpath] [Collection Name]"
    echo "Example : $0 LoginInfo.json"
    exit 1
fi

mongoimport --host 10.72.51.130:27017 --db msa --collection $2 --drop --jsonArray $1

echo "Data restore was successfully completed."
# 暂存结束时间
end=$(date +%s)

echo "Runtime: $((end-start)) seconds"