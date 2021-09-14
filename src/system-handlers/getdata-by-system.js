export function getSystemData(input, chatMessage) {
    const systemID = game.system.id;
    let inputAtr;
    let itemId;
    let item;
    let tokenId;
    let token;
    let targets;
    let hitTargets;
    let actor;
    let reach;
    switch (systemID) {
        case 'dnd5e':
            if (game.modules.get('midi-qol')?.active && !chatMessage) {
                token = canvas.tokens.get(input.tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(input.item?._id) != null);
                if (input.item?.data?.flags?.autoanimations?.options?.ammo && input.item?.data?.data?.consume?.type === "ammo") {
                    itemId = input.item.data.data.consume.target;
                    item = token.actor.items?.get(itemId) ?? "";
                } else {
                    item = input.item
                }
                hitTargets = Array.from(input.hitTargets);
                targets = Array.from(input.targets);
                if (game.modules.get('midi-qol')?.active) {
                    switch (true) {
                        case (game.settings.get("autoanimations", "playonmiss")):
                            targets = targets;
                            break;
                        case (game.settings.get("autoanimations", "playonhit")):
                            targets = hitTargets;
                            break;
                        default:
                            targets = targets;
                    }
                }
                reach = 0;
                if (token.actor?.data?.data?.details?.race?.toLowerCase() === 'bugbear') {
                    reach += 5;
                }
                if (item.data?.data?.properties?.rch) {
                    reach += 5;
                }
                if (!item || !token) { return; }
            } else {
                inputAtr = extractItemId(input.data?.content);
                itemId = input.data?.flags?.dnd5e?.roll?.itemId || inputAtr || input.data?.flags?.["midi-qol"]?.itemId;
                tokenId = input.data?.speaker?.token;
                token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(itemId) != null);
                item = token.actor?.items?.get(itemId);
                if (item.data?.flags?.autoanimations?.options?.ammo && item.data?.data?.consume?.type === "ammo") {
                    itemId = item.data.data.consume.target;
                    item = token.actor.items?.get(itemId) ?? "";
                }
                targets = Array.from(input.user.targets);
                reach = 0;
                if (token.actor?.data?.data?.details?.race?.toLowerCase() === 'bugbear') {
                    reach += 5;
                }
                if (item.data?.data?.properties?.rch) {
                    reach += 5;
                }
                if (!item || !token) { return; }
            }
            break;
        case 'D35E':
            itemId = extractItemId(input.data?.content);
            tokenId = input.data?.speaker?.token;
            token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(itemId) != null);
            item = token.actor.items?.get(itemId) ?? null;
            targets = Array.from(input.user.targets);
            if (!item || !token) { return; }
            break;
        case 'sw5e':
            if (game.modules.get('midi-qol')?.active && !chatMessage) {
                token = canvas.tokens.get(input.tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(input.item?._id) != null);
                if (input.item?.data?.flags?.autoanimations?.options?.ammo && input.item?.data?.data?.consume?.type === "ammo") {
                    itemId = input.item.data.data.consume.target;
                    item = token.actor.items?.get(itemId) ?? "";
                } else {
                    item = input.item
                }
                hitTargets = Array.from(input.hitTargets);
                targets = Array.from(input.targets);
                if (game.modules.get('midi-qol')?.active) {
                    switch (true) {
                        case (game.settings.get("autoanimations", "playonmiss")):
                            targets = targets;
                            break;
                        case (game.settings.get("autoanimations", "playonhit")):
                            targets = hitTargets;
                            break;
                        default:
                            targets = targets;
                    }
                }
                reach = 0;
                if (token.actor?.data?.data?.details?.race?.toLowerCase() === 'bugbear') {
                    reach += 5;
                }
                if (item.data?.data?.properties?.rch) {
                    reach += 5;
                }
                if (!item || !token) { return; }
            } else {
                itemId = input.data?.flags?.sw5e?.roll?.itemId;
                tokenId = input.data?.speaker?.token;
                token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(itemId) != null);
                item = token.actor.items?.get(itemId) ?? "";
                targets = Array.from(input.user.targets);
                if (!item || !token) { return; }
            }
            break;
        case 'pf1':
            item = input?.itemSource;
            tokenId = input.data?.speaker?.token;
            token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(item?.id) != null);
            targets = Array.from(input.user.targets);
            if (!item || !token) { return; }
            break;
        case 'pf2e':
            item = input.item;
            token = input.token || canvas.tokens.placeables.find(token => token.actor?.items?.get(item?.id) != null);
            targets = Array.from(input.user.targets);
            if (!item || !token) { return; }
            break;
        case 'forbidden-lands':
            itemId = input._roll.options?.itemId;
            tokenId = input._roll.options?.tokenId;
            token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor?.items?.get(itemID) != null);
            item = token.actor?.items?.get(itemId);
            targets = Array.from(input.user.targets);
            if (!item || !token) { return; }
            break;
        case 'demonlord':
            itemId = input.itemId;
            token = input.sourceToken || canvas.tokens.placeables.find(token => token.actor.items.get(itemId) != null);
            item = token.actor?.items?.get(itemId);
            hitTargets = input.hitTargets || [];
            hitTargets = Array.from(hitTargets);
            if (game.settings.get("autoanimations", "playtrigger") === "hits") {
                targets = hitTargets;
            } else {
                targets = Array.from(input.targets);
            }
            const canRunAnimations = () => {
                const commonEventTypes = ["apply-healing"]
                if (!item?.hasDamage() && !item?.hasHealing()) {
                    return true
                }
                if (game.settings.get("autoanimations", "playtrigger") === "rolldamage") {
                    return commonEventTypes.concat(["roll-damage"]).includes(eventType)
                } if (game.settings.get("autoanimations", "playtrigger") === "applydamage") {
                    return commonEventTypes.concat(["apply-damage"]).includes(eventType)
                }
                return commonEventTypes.concat(["roll-attack"]).includes(eventType)
            }

            if (input.eventType && !canRunAnimations()) {
                return;
            }
            break;
        case 'swade':
            item = input.SwadeItem;
            actor = input.SwadeActor;
            token = canvas.tokens.placeables.find(token => token.actor?.items?.get(item.id) != null) || canvas.tokens.ownedTokens.find(x => x.actor.id === actor.id);
            targets = Array.from(game.user.targets);
            if (!item || !token) { return; }
            break;
        case 'tormenta20':
            itemId = extractItemId(input.data?.content);
            tokenId = input.data?.speaker?.token;
            token = canvas.tokens.get(tokenId) || canvas.tokens.placeables.find(token => token.actor.items.get(itemId) != null);
            item = token.actor.items?.get(itemId) ?? "";
            targets = Array.from(input.user.targets);
            if (!item || !token) { return; }
            break;
        case 'wfrp4e':
            item = input.item;
            itemId = item._id;
            token = canvas.tokens.placeables.find(token => token.actor?.items?.get(itemId) != undefined);
            targets = Array.from(input.targets);
            if (!item || !token) { return; }
            break;
    }

    return { item, token, targets, hitTargets, reach };

}

function extractItemId(content) {
    try {
        return $(content).attr("data-item-id");
    } catch (exception) {
        console.log("Autoanimations | Couldn´t extract data-item-id for message :", content);
        return null;
    }
}