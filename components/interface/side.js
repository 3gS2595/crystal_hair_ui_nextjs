export default function Side({json}) {
	const item = ({site, id}) => (
		<div key={id}>
			<a id={id} key={id} href={'http://' + site} target="_blank">{site}</a>
			<br/>
		</div>
	);
	return json.map((i) => item(i));
}
