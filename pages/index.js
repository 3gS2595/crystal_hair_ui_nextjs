import { filt, tabi } from "./jotaiAtom";
import { atom, useAtom } from 'jotai'
import { React, useEffect, useState } from 'react';
import { useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table } from "../components/table/table.js"
import Info from "../components/annex/annex.js";
import Side from "../components/interface/side";
import Board from "../components/interface/threejs/threeScene";
import ThemeUpdate from '../components/darkMode/ThemeUpdate';
import { css } from "@mui/material";

import { fileColumns } from '../components/table/columns/fileColumns'
import { rssColumns } from '../components/table/columns/rssColumns'
import { namesColumns } from '../components/table/columns/namesColumns'
import { sitesColumns } from '../components/table/columns/sitesColumns'

const site = 'http://192.168.1.180:3000'

export default function Index() {
	const [tabIndex, setTabIndex] = useAtom(tabi);
	const [filter, setFilter] = useAtom(filt);
	return (
		<Tabs selectedIndex={tabIndex}
			forceRenderTabPanel={true}
			onSelect={(index) => handleSelect(index)}
		>

			<div dir='ltr'>
				<TabList>
					<ThemeUpdate />
					<Tab eventkey={0}>rss</Tab>
					<Tab eventkey={1}>obj</Tab>
					<Tab eventkey={2}>annex</Tab>
				</TabList>
			</div>

			<div id="interface">
				<SiteDirectory/>
				<Board/>	
			</div>

			<TabPanel>
				<RssTableindex/>
			</TabPanel>

			<TabPanel>
				<ObjTableindex/>
			</TabPanel>

			<TabPanel>
				<Info/>
			</TabPanel>

		</Tabs>
	)

	function handleSelect(key) {
		setFilter('')
		setTabIndex(key)
	}
}

const RssTableindex = () => {
	const[nameData, setNameData] = useState([]);
	const[rssData, setRssData] = useState([]);
	const[siteData, setSiteData] = useState([]);

	useEffect(() => {
		fetch(site + '/rsses').then(res => res.json())
		.then(data => { setRssData(data); }).catch((e) => {console.log(e)});
		fetch(site + '/names').then(res => res.json())
		.then(data => { setNameData(data); }).catch((e) => {console.log(e)});
		fetch(site + '/sites').then(res => res.json())
		.then(data => { setSiteData(data); }).catch((e) => {console.log(e)});
	}, []);
	return(
		<div id="tableindex">
			<Table length={31} columns={rssColumns} data={rssData} />
			<div id="subTableIndex">
				<div id="subTable">
					<Table length={10} columns={sitesColumns} data={siteData} />
				</div>
				<div id="seperate"/>
				<div id="subTable">
					<Table length={10} columns={namesColumns} data={nameData} />
				</div>
			</div>
		</div>
	)
}

const ObjTableindex = () => {
	const[fileData, setFileData] = useState([]);

	useEffect(() => {
		fetch(site + '/docs').then(res => res.json())
		.then(data => { setFileData(data); }).catch((e) => {console.log(e)});
	}, []);
	return(
		<div id="tableindex">
					<Table length={47} columns={fileColumns} data={fileData} />
		</div>
	)
}

const SiteDirectory = () => {
	const[sideData, setSideData] = useState([]);

	useEffect(() => {
		fetch(site + '/sites').then(res => res.json())
		.then(data => { setSideData(data); }).catch((e) => {console.log(e)});
	}, []);
	return(
		<div id="siteDirectory">
			<Side id='side' json={sideData}/>
		</div>
	)
}

