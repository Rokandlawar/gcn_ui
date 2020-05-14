import React, { useEffect, forwardRef, useState } from 'react';
import { GetNoticeData } from '../../../REST/administration';
import CRUDView from '../../../components/crud';
import DocIcon from '@material-ui/icons/FileCopy';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import Axios from 'axios';

function NoticeView({ module, entityId, editable = true, display = true }, ref) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (module > 0 && entityId > 0) {
            GetNoticeData(module, entityId).then(response => {
                if (Array.isArray(response.data)) {
                    const opts = response.data.map(x => {
                        return { ...x, fields: x.fields.map(y => { return { name: y, id: y } }) }
                    })
                    setData(opts)
                }
            })
        }
    }, [module, entityId])

    const config = [
        { field: 'name', title: 'Notice Type', isGrid: true },
        { field: 'description', title: 'Notice Description', isGrid: true }
    ]

    const handleDocx = (evt, rowData) => handleMerge(rowData.template, data, rowData.name, 'docx');
    const handlePdf = (evt, rowData) => handleMerge(rowData.template, data, rowData.name, 'pdf');

    const handleMerge = (sfdt, groups, title, type) => {
        Axios.post(`${process.env.REACT_APP_TEMPLATE_API}/documenteditor/${type}`, JSON.stringify({ sfdt, groups }), {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.${type}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    const actions = [
        { icon: DocIcon, tooltip: 'Download DOCX', onClick: handleDocx },
        { icon: PdfIcon, tooltip: 'Download PDF', onClick: handlePdf }
    ]

    return <CRUDView columns={config} title='Notices' id='id' url={`${process.env.REACT_APP_API_URL}/Notice/Modules/${module}`} actions={actions}
        allowAdd={false} allowDelete={false} allowEdit={false} />
}

export default forwardRef(NoticeView);