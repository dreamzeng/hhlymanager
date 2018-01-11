<template>
    <div>
        <el-upload class="image-uploader" :action="action" :data="fdata" :file-list="fileList" :with-credentials="withCredentials" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :on-change="handleChange" :list-type="listType">
            <el-button size="small" type="primary">{{btnName}}</el-button>
            <div slot="tip" class="el-upload__tip"> {{strFormat}} （上传文件大小不能超过 {{fsize}}MB!）</div>
        </el-upload>
    </div>
</template>

<script>
import INDEX from 'api/index';
const URL = INDEX.API_URL;

export default {
    name: 'uploadFile',
    props: {
        uploadApi: {
            type: String,
            default: '/upload'
        },
        //上传文件要提交的数据  
        fdata: {
            type: Object,
            default: function() {
                return {
                    'type': ''
                }
            }
        },
        //文件大小 2M  
        fsize: {
            type: Number,
            default: 2
        },
        //文件长度，-1 默认上传多张图片，非 -1 只能上传一张图片
        flength: {
            type: Number,
            default: -1
        },
        //按钮文字
        btnName: {
            type: String,
            default: '点击上传'
        },
        //文件格式 传空数组时可以上传任意图片
        fileFormat: {
            type: Array,
            default: function() {
                return ['.jpeg', '.png'];
            }
        },
        //文件缩略图
        listType: {
            type: String,
            default: 'picture' //text/picture/picture-card
        },
        //初始化文件数组
        files: {
            type: Array,
            default: function() {
                /*return [
                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                ]*/
                return [];
            }
        }
    },
    data() {
        return {
            withCredentials: true,
            fileList: [],
            codeMap: {
                ".*": "application/octet-stream",
                ".001": "application/x-001",
                ".301": "application/x-301",
                ".323": "text/h323",
                ".906": "application/x-906",
                ".907": "drawing/907",
                ".a11": "application/x-a11",
                ".acp": "audio/x-mei-aac",
                ".ai": "application/postscript",
                ".aif": "audio/aiff",
                ".aifc": "audio/aiff",
                ".aiff": "audio/aiff",
                ".anv": "application/x-anv",
                ".asa": "text/asa",
                ".asf": "video/x-ms-asf",
                ".asp": "text/asp",
                ".asx": "video/x-ms-asf",
                ".au": "audio/basic",
                ".avi": "video/avi",
                ".awf": "application/vnd.adobe.workflow",
                ".biz": "text/xml",
                ".bmp": "application/x-bmp",
                ".bot": "application/x-bot",
                ".c4t": "application/x-c4t",
                ".c90": "application/x-c90",
                ".cal": "application/x-cals",
                ".cat": "application/vnd.ms-pki.seccat",
                ".cdf": "application/x-netcdf",
                ".cdr": "application/x-cdr",
                ".cel": "application/x-cel",
                ".cer": "application/x-x509-ca-cert",
                ".cg4": "application/x-g4",
                ".cgm": "application/x-cgm",
                ".cit": "application/x-cit",
                ".class": "java/*",
                ".cml": "text/xml",
                ".cmp": "application/x-cmp",
                ".cmx": "application/x-cmx",
                ".cot": "application/x-cot",
                ".crl": "application/pkix-crl",
                ".crt": "application/x-x509-ca-cert",
                ".csi": "application/x-csi",
                ".css": "text/css",
                ".cut": "application/x-cut",
                ".dbf": "application/x-dbf",
                ".dbm": "application/x-dbm",
                ".dbx": "application/x-dbx",
                ".dcd": "text/xml",
                ".dcx": "application/x-dcx",
                ".der": "application/x-x509-ca-cert",
                ".dgn": "application/x-dgn",
                ".dib": "application/x-dib",
                ".dll": "application/x-msdownload",
                ".doc": "application/msword",
                ".dot": "application/msword",
                ".drw": "application/x-drw",
                ".dtd": "text/xml",
                ".dwf": "Model/vnd.dwf",
                ".dwf": "application/x-dwf",
                ".dwg": "application/x-dwg",
                ".dxb": "application/x-dxb",
                ".dxf": "application/x-dxf",
                ".edn": "application/vnd.adobe.edn",
                ".emf": "application/x-emf",
                ".eml": "message/rfc822",
                ".ent": "text/xml",
                ".epi": "application/x-epi",
                ".eps": "application/x-ps",
                ".eps": "application/postscript",
                ".etd": "application/x-ebx",
                ".exe": "application/x-msdownload",
                ".fax": "image/fax",
                ".fdf": "application/vnd.fdf",
                ".fif": "application/fractals",
                ".fo": "text/xml",
                ".frm": "application/x-frm",
                ".g4": "application/x-g4",
                ".gbr": "application/x-gbr",
                ".gcd": "application/x-gcd",
                ".gif": "image/gif",
                ".gl2": "application/x-gl2",
                ".gp4": "application/x-gp4",
                ".hgl": "application/x-hgl",
                ".hmr": "application/x-hmr",
                ".hpg": "application/x-hpgl",
                ".hpl": "application/x-hpl",
                ".hqx": "application/mac-binhex40",
                ".hrf": "application/x-hrf",
                ".hta": "application/hta",
                ".htc": "text/x-component",
                ".htm": "text/html",
                ".html": "text/html",
                ".htt": "text/webviewhtml",
                ".htx": "text/html",
                ".icb": "application/x-icb",
                ".ico": "image/x-icon",
                ".ico": "application/x-ico",
                ".iff": "application/x-iff",
                ".ig4": "application/x-g4",
                ".igs": "application/x-igs",
                ".iii": "application/x-iphone",
                ".img": "application/x-img",
                ".ins": "application/x-internet-signup",
                ".isp": "application/x-internet-signup",
                ".IVF": "video/x-ivf",
                ".java": "java/*",
                ".jfif": "image/jpeg",
                ".jpe": "image/jpeg",
                ".jpe": "application/x-jpe",
                ".jpeg": "image/jpeg",
                ".jpg": "image/jpeg",
                ".jpg": "application/x-jpg",
                ".js": "application/x-javascript",
                ".jsp": "text/html",
                ".la1": "audio/x-liquid-file",
                ".lar": "application/x-laplayer-reg",
                ".latex": "application/x-latex",
                ".lavs": "audio/x-liquid-secure",
                ".lbm": "application/x-lbm",
                ".lmsff": "audio/x-la-lms",
                ".ls": "application/x-javascript",
                ".ltr": "application/x-ltr",
                ".m1v": "video/x-mpeg",
                ".m2v": "video/x-mpeg",
                ".m3u": "audio/mpegurl",
                ".m4e": "video/mpeg4",
                ".mac": "application/x-mac",
                ".man": "application/x-troff-man",
                ".math": "text/xml",
                ".mdb": "application/msaccess",
                ".mdb": "application/x-mdb",
                ".mfp": "application/x-shockwave-flash",
                ".mht": "message/rfc822",
                ".mhtml": "message/rfc822",
                ".mi": "application/x-mi",
                ".mid": "audio/mid",
                ".midi": "audio/mid",
                ".mil": "application/x-mil",
                ".mml": "text/xml",
                ".mnd": "audio/x-musicnet-download",
                ".mns": "audio/x-musicnet-stream",
                ".mocha": "application/x-javascript",
                ".movie": "video/x-sgi-movie",
                ".mp1": "audio/mp1",
                ".mp2": "audio/mp2",
                ".mp2v": "video/mpeg",
                ".mp3": "audio/mp3",
                ".mp4": "video/mpeg4",
                ".mpa": "video/x-mpg",
                ".mpd": "application/vnd.ms-project",
                ".mpe": "video/x-mpeg",
                ".mpeg": "video/mpg",
                ".mpg": "video/mpg",
                ".mpga": "audio/rn-mpeg",
                ".mpp": "application/vnd.ms-project",
                ".mps": "video/x-mpeg",
                ".mpt": "application/vnd.ms-project",
                ".mpv": "video/mpg",
                ".mpv2": "video/mpeg",
                ".mpw": "application/vnd.ms-project",
                ".mpx": "application/vnd.ms-project",
                ".mtx": "text/xml",
                ".mxp": "application/x-mmxp",
                ".net": "image/pnetvue",
                ".nrf": "application/x-nrf",
                ".nws": "message/rfc822",
                ".odc": "text/x-ms-odc",
                ".out": "application/x-out",
                ".p10": "application/pkcs10",
                ".p12": "application/x-pkcs12",
                ".p7b": "application/x-pkcs7-certificates",
                ".p7c": "application/pkcs7-mime",
                ".p7m": "application/pkcs7-mime",
                ".p7r": "application/x-pkcs7-certreqresp",
                ".p7s": "application/pkcs7-signature",
                ".pc5": "application/x-pc5",
                ".pci": "application/x-pci",
                ".pcl": "application/x-pcl",
                ".pcx": "application/x-pcx",
                ".pdf": "application/pdf",
                ".pdf": "application/pdf",
                ".pdx": "application/vnd.adobe.pdx",
                ".pfx": "application/x-pkcs12",
                ".pgl": "application/x-pgl",
                ".pic": "application/x-pic",
                ".pko": "application/vnd.ms-pki.pko",
                ".pl": "application/x-perl",
                ".plg": "text/html",
                ".pls": "audio/scpls",
                ".plt": "application/x-plt",
                ".png": "image/png",
                ".png": "application/x-png",
                ".pot": "application/vnd.ms-powerpoint",
                ".ppa": "application/vnd.ms-powerpoint",
                ".ppm": "application/x-ppm",
                ".pps": "application/vnd.ms-powerpoint",
                ".ppt": "application/vnd.ms-powerpoint",
                ".ppt": "application/x-ppt",
                ".pr": "application/x-pr",
                ".prf": "application/pics-rules",
                ".prn": "application/x-prn",
                ".prt": "application/x-prt",
                ".ps": "application/x-ps",
                ".ps": "application/postscript",
                ".ptn": "application/x-ptn",
                ".pwz": "application/vnd.ms-powerpoint",
                ".r3t": "text/vnd.rn-realtext3d",
                ".ra": "audio/vnd.rn-realaudio",
                ".ram": "audio/x-pn-realaudio",
                ".ras": "application/x-ras",
                ".rat": "application/rat-file",
                ".rdf": "text/xml",
                ".rec": "application/vnd.rn-recording",
                ".red": "application/x-red",
                ".rgb": "application/x-rgb",
                ".rjs": "application/vnd.rn-realsystem-rjs",
                ".rjt": "application/vnd.rn-realsystem-rjt",
                ".rlc": "application/x-rlc",
                ".rle": "application/x-rle",
                ".rm": "application/vnd.rn-realmedia",
                ".rmf": "application/vnd.adobe.rmf",
                ".rmi": "audio/mid",
                ".rmj": "application/vnd.rn-realsystem-rmj",
                ".rmm": "audio/x-pn-realaudio",
                ".rmp": "application/vnd.rn-rn_music_package",
                ".rms": "application/vnd.rn-realmedia-secure",
                ".rmvb": "application/vnd.rn-realmedia-vbr",
                ".rmx": "application/vnd.rn-realsystem-rmx",
                ".rnx": "application/vnd.rn-realplayer",
                ".rp": "image/vnd.rn-realpix",
                ".rpm": "audio/x-pn-realaudio-plugin",
                ".rsml": "application/vnd.rn-rsml",
                ".rt": "text/vnd.rn-realtext",
                ".rtf": "application/msword",
                ".rtf": "application/x-rtf",
                ".rv": "video/vnd.rn-realvideo",
                ".sam": "application/x-sam",
                ".sat": "application/x-sat",
                ".sdp": "application/sdp",
                ".sdw": "application/x-sdw",
                ".sit": "application/x-stuffit",
                ".slb": "application/x-slb",
                ".sld": "application/x-sld",
                ".slk": "drawing/x-slk",
                ".smi": "application/smil",
                ".smil": "application/smil",
                ".smk": "application/x-smk",
                ".snd": "audio/basic",
                ".sol": "text/plain",
                ".sor": "text/plain",
                ".spc": "application/x-pkcs7-certificates",
                ".spl": "application/futuresplash",
                ".spp": "text/xml",
                ".ssm": "application/streamingmedia",
                ".sst": "application/vnd.ms-pki.certstore",
                ".stl": "application/vnd.ms-pki.stl",
                ".stm": "text/html",
                ".sty": "application/x-sty",
                ".svg": "text/xml",
                ".swf": "application/x-shockwave-flash",
                ".tdf": "application/x-tdf",
                ".tg4": "application/x-tg4",
                ".tga": "application/x-tga",
                ".tif": "image/tiff",
                ".tif": "application/x-tif",
                ".tiff": "image/tiff",
                ".tld": "text/xml",
                ".top": "drawing/x-top",
                ".torrent": "application/x-bittorrent",
                ".tsd": "text/xml",
                ".txt": "text/plain",
                ".uin": "application/x-icq",
                ".uls": "text/iuls",
                ".vcf": "text/x-vcard",
                ".vda": "application/x-vda",
                ".vdx": "application/vnd.visio",
                ".vml": "text/xml",
                ".vpg": "application/x-vpeg005",
                ".vsd": "application/vnd.visio",
                ".vsd": "application/x-vsd",
                ".vss": "application/vnd.visio",
                ".vst": "application/vnd.visio",
                ".vst": "application/x-vst",
                ".vsw": "application/vnd.visio",
                ".vsx": "application/vnd.visio",
                ".vtx": "application/vnd.visio",
                ".vxml": "text/xml",
                ".wav": "audio/wav",
                ".wax": "audio/x-ms-wax",
                ".wb1": "application/x-wb1",
                ".wb2": "application/x-wb2",
                ".wb3": "application/x-wb3",
                ".wbmp": "image/vnd.wap.wbmp",
                ".wiz": "application/msword",
                ".wk3": "application/x-wk3",
                ".wk4": "application/x-wk4",
                ".wkq": "application/x-wkq",
                ".wks": "application/x-wks",
                ".wm": "video/x-ms-wm",
                ".wma": "audio/x-ms-wma",
                ".wmd": "application/x-ms-wmd",
                ".wmf": "application/x-wmf",
                ".wml": "text/vnd.wap.wml",
                ".wmv": "video/x-ms-wmv",
                ".wmx": "video/x-ms-wmx",
                ".wmz": "application/x-ms-wmz",
                ".wp6": "application/x-wp6",
                ".wpd": "application/x-wpd",
                ".wpg": "application/x-wpg",
                ".wpl": "application/vnd.ms-wpl",
                ".wq1": "application/x-wq1",
                ".wr1": "application/x-wr1",
                ".wri": "application/x-wri",
                ".wrk": "application/x-wrk",
                ".ws": "application/x-ws",
                ".ws2": "application/x-ws",
                ".wsc": "text/scriptlet",
                ".wsdl": "text/xml",
                ".wvx": "video/x-ms-wvx",
                ".xdp": "application/vnd.adobe.xdp",
                ".xdr": "text/xml",
                ".xfd": "application/vnd.adobe.xfd",
                ".xfdf": "application/vnd.adobe.xfdf",
                ".xhtml": "text/html",
                ".xls": "application/vnd.ms-excel",
                ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".xlw": "application/x-xlw",
                ".xml": "text/xml",
                ".xpl": "audio/scpls",
                ".xq": "text/xml",
                ".xql": "text/xml",
                ".xquery": "text/xml",
                ".xsd": "text/xml",
                ".xsl": "text/xml",
                ".xslt": "text/xml",
                ".xwd": "application/x-xwd",
                ".x_b": "application/x-x_b",
                ".x_t": "application/x-x_t"
            }
        }
    },
    computed: {
        strFormat() {
            if (this.fileFormat.length > 0) {
                return '只能上传' + this.fileFormat.join(',') + '文件';
            }
            return '';
        },
        action() {
            // return URL + this.uploadApi
            return 'https://jsonplaceholder.typicode.com/posts/'
        }
    },
    mounted() {
        let _files = JSON.stringify(this.files);
        this.fileList = JSON.parse(_files);
    },
    methods: {
        getFileList() {
            console.log(this.fileList);
            return this.fileList;
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        beforeAvatarUpload(file) {
            console.log(file);
            const isLt2M = file.size / 1024 / 1024 < this.fsize;

            let flag = false;
            for (let i = 0, l = this.fileFormat.length; i < l; i++) {
                //console.log(file.type , this.codeMap[this.fileFormat[i]])
                if (file.type == this.codeMap[this.fileFormat[i]]) {
                    flag = true;
                    break;
                }
            }
            if (!flag && this.fileFormat.length > 0) {
                this.$message.error(`上传图片只能是 ${this.strFormat} 格式!`);
                return false;
            }
            if (!isLt2M) {
                this.$message.error(`上传图片大小不能超过 ${this.fsize}MB!`);
                return false;
            }
            return true;
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);  
            return;
            if (file.response && file.response.code == 10) {
                let _l = fileList.length - 1;
                fileList.splice(_l, 1);
                this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('USER_SIGNOUT');
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                }).catch(() => {

                });
                return;
            }
            if (file.response && file.response.code != 1) {
                file.response.msg && this.$message.error(file.response.msg);
                let _l = fileList.length - 1;
                fileList.splice(_l, 1);
                this.fileList = fileList;
                return;
            }
            if (file.response && file.response.code == 1) {
                file.response.msg && this.$message({
                    message: file.response.msg,
                    type: 'success'
                });
                if (this.flength != -1 && fileList.length > this.flength) {
                    fileList.splice(0, 1);
                }
                this.fileList = fileList;
            }
        }
    }
}
</script>

