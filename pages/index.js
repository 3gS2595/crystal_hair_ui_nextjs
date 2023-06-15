import { React, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { atom, useAtom } from 'jotai'
import { filt, tabi } from "./_app";

import DarkModeToggle from "../components/darkMode/darkMode.js";
import { Table } from "../components/tables/table.js"
import Info from "../components/info.js";
import Side from "../components/interface/side";
import Threejs from "../components/interface/threejs";

import { fileColumns } from '../components/tables/columns/fileColumns'
import { rssColumns } from '../components/tables/columns/rssColumns'
import { namesColumns } from '../components/tables/columns/namesColumns'
import { sitesColumns } from '../components/tables/columns/sitesColumns'


export default function Index() {

	const[nameData, setNameData] = useState([]);
	const[fileData, setFileData] = useState([]);
	const[rssData, setRssData] = useState([]);
	const[siteData, setSiteData] = useState([]);
	useEffect(() => {
		fetch(site + '/docs').then(res => res.json())
		.then(data => { setFileData(data); }).catch((e) => {console.log(e)});
		fetch(site + '/rsses').then(res => res.json())
		.then(data => { setRssData(data); }).catch((e) => {console.log(e)});
		fetch(site + '/names').then(res => res.json())
		.then(data => { setNameData(data); }).catch((e) => {console.log(e)});
		fetch(site + '/sites').then(res => res.json())
		.then(data => { setSiteData(data); }).catch((e) => {console.log(e)});
	}, []);

	const site = 'http://192.168.1.180:3000'

    const [tabIndex, setTabIndex] = useAtom(tabi);
    const [filter, setFilter] = useAtom(filt);

    return (
        <Tabs
            selectedIndex={tabIndex}
            forceRenderTabPanel={true}
            onSelect={(index) => handleSelect(index)}
        >

            <div dir='rtl'>
                <TabList>
                    <DarkModeToggle />
                    <Tab eventkey={0}>rss</Tab>
                    <Tab eventkey={1}>obj</Tab>
                    <Tab eventkey={2}>annex</Tab>
                </TabList>
            </div>

            <div id="interface">
                <div id="split">
                    <Side />
                </div>
                <div id="root">
                    <Threejs />
				</div>
            </div>

            <TabPanel >
                <div id="p">
                    <Table length={31} columns={rssColumns} data={rssData} />
                    <div id="carrier">
                        <div id="sp">
                            <Table length={10} columns={namesColumns} data={nameData} />
                        </div>
                        <div id="seperate"/>
                        <div id="sp">
                            <Table length={10} columns={sitesColumns} data={siteData} />
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
				<div id="p">
					<Table length={47} columns={fileColumns} data={fileData} />
				</div>
            </TabPanel>
            <TabPanel>
                <Info />
            </TabPanel>
        </Tabs>
    )

    function handleSelect(key) {
        setFilter('')
        setTabIndex(key)
    }
}
