import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

export function readLocalMedia(mediaUrl: string): { buffer: Buffer; name: string } {
	const resolved = mediaUrl.startsWith("~")
		? path.join(os.homedir(), mediaUrl.slice(1))
		: mediaUrl.replace(/^file:\/\//, "");

	if (!fs.existsSync(resolved)) {
		throw new Error(`Media file not found: ${resolved}`);
	}
	return { buffer: fs.readFileSync(resolved), name: path.basename(resolved) };
}
