@echo off
echo "数据库还原脚本"
mongoimport /h localhost /d msa /c loginInfo /drop /jsonArray LoginInfo.json
echo "按任意键关闭"
pause >nul
exit