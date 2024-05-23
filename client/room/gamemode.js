import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Game, Players, Inventory, LeaderBoard, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns, Timers, TeamsBalancer, Build, AreaPlayerTriggerService } from 'pixel_combats/room';

// Создаём команды
Teams.Get("Blue").Value = "<b><i>Синие</i></b>", new Color(0, 0, 1, 0,));
Teams.Get("Red").Value = "<b><i>Красные</i></b>", new Color(0, 1, 0, 0,));
var BlueTeam = Teams.Get("Blue");
var RedTeam = Teams.Get("Red");
BlueTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
RedTeam.Build.BlocksSet.Value = BuildBlocksSet.Red;
// Лидерборды
LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b><i>Киллы</i></b>", "<b><i>Киллы</i></b>"),
  new DisplayValueHeader("Smepti", "<b><i>Смерти</i></b>", "<b><i>Смерти</i></b>"),
  new DisplayValueHeader("Scores", "<b><i>Очки</i></b>", "<b><i>Очки</i></b>"),
];
// Teams.RedBlueTeam = DesTeams.Getcontext
Teams.Get("Blue").Properties.Get("Deaths").Value = "<b><i><color=Blue>Синие</a></i></b>";
Teams.Get("Red").Properties.Get("Deaths").Value = "<b><i><color=Red>Красные</a></i></b>";
// Урон за очки
var immortalityTimerName = "immortality";
Spawns.GetContext().OnSpawn.Add(function(player){
  player.Properties.Immortality.Value = true;
  timer = player.Timers.Get(immortalityTimerName).Restart(5);
});
Timers.OnPlayerTimer.Add(function(timer){
  if (timer.Id != immortalityTimerName) return;
  timer.Player.Properties.Immortality.Value = false;
});

Damage.OnDeath.Add(function(player) {
  ++player.Properties.Deaths.Value;
});
Damage.OnDamage.Add(function(player, damaged, damage) {
  if (GameMode.Parameters.GetBool("scoresOnDamage")) {
    if (player.id != damaged.id) player.Properties.Scores.Value += Math.ceil(damage);
  }
});
Damage.OnKill.Add(function(player, killed) {
  if (player.id !== killed.id) { 
    ++player.Properties.Kills.Value;
    player.Properties.Scores.Value += 250;
  }
});
// Inventory = Inventory.Value = false;
Player.Inventory.Main.("Blue").Value = false;
Player.Inventory.Secondary.("Blue").Value = false;
Player.Inventory.Explosive.("Blue").Value = false;
Player.Inventory.Build.("Blue").Value = false;
Player.Inventory.BuildInfinity.("Blue").Value = false;





