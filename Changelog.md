0.1.1 Release:  
- Healing Potions and Second Wind can now call the healing animations (not by default). Use *heal* in the source for generic healing animation, use *cure wounds* for the cure wounds animation. Add a color in the source field for desired color variant.  
- Item Name check fixes to account for custom items and prep for future expansions  
- Removed the dependency on JB2A Free Module. If you have the patreon module the free module will no longer be required to be installed and active.
- Added error notifications if NO JB2A module is installed.
- Added Pop-Up window with information and to let users know the module REQUIRES a JB2A module to be installed
- You can now switch the Cure Wounds / Healing Word animations. If switching Cure Wounds, add *heal* to the source field, then a color option (This will then use the generic healing animation). If using healing word, you can switch to the Cure Wounds animation by adding "cure wounds" to the source field.  
- Tweaked the scaling of ranged attacks/spells

0.1.0 Release:
- Shield spell animation now scales globally and to token size  
- Removed the item TYPE check. This prevented some animations being used on certain items  
- Fixed Ray of Frost from not casting at long range.  
- Back end code clean-up.  
- Fixed the 1hb and 1hb incorrectly using the slashing damage. They should now both use the correct generic bludgeoning animations.  

0.0.9 Release:  
- Limited the color reading to source field only. Prevents some custom weapons from calling the wrong animation  
- Added Stutter TMFX to the Generic damage types  
- Added JB2A Free Module as a dependency in the module.js. For release through official channels this is required to prevent someone downloading the Automated Module and not having any JB2A modules installed, thus causing them to have a useless module. This is necessary until I find a work around for the issue. The Patreon version still works with this module  

0.0.8 Release:  
- Fix for custom items being imported with Source field = null  
- 
2.0.6 Release:
- Reconfigured the Token Magic FX filters to AutoDestroy themselves. This should improve the performance of the filters applying and deleting on The Forge.

- Fixed an error with Magic Missile where the animation would not play

- Added an optional Shield Spell animation effect (enable in settings). This temporarily utilizes the Anti-Life shell animation.

- Cleaned up the way the module directs traffic to avoid unnecessary checks.


0.0.5 Release:
- Added a new setting: Only Play Animation on Damage Rolls  
  Allows for further customization of animations and when they play

- Corrected the check for Free vs Patreon Module. It should now work for both.

- Added Explosions (See PDF for Keywords)  
  Designed for use on items that utilize templates.  
  You can set the color, variant, and radius of the explosion in the Source Field

- Added Exploding Arrows (See PDF for Keywords)  
  Add the word explode in the source field and then set the color, variant and radius of the explosion.

0.0.4 Release:
- Token Magic FX options are now ADDED and REMOVED selectively to the Token. This means they should remove themselves even if the affected token is untargeted (think dead).

- Now ONLY removes the Token Magic FX that were applied with the given animation. All pre-existing TMFX filters should remain active and not be deleted

- Melee-Range detection should now be working correctly, Big thanks to brkwsk for the help.

- Playing with the timing of different TFMX applications and Animations to help streamline when used on The Forge.